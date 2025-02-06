const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({
  origin: true,
  methods: ["POST", "OPTIONS"],
});

// Firebase 프로젝트 ID 가져오기
const projectId = process.env.GCLOUD_PROJECT;

// 무료 할당량 기준 (Firestore: 50K 읽기, 50K 쓰기, 50K 삭제)
const FREE_QUOTA = {
  firestoreRead: 20000,
  firestoreWrite: 20000,
  firestoreDelete: 20000,
};

/**
 * 현재 Firestore의 사용량을 확인하는 함수
 * @return {Promise<boolean>} - 무료 할당량 내에 있으면 true, 초과하면 false
 */
async function isUnderFreeQuota() {
  try {
    const response = await axios.get(
        `https://cloudbilling.googleapis.com/v1/projects/${projectId}/billingInfo`,
        {
          headers: {
            Authorization: `Bearer ${await getAccessToken()}`,
          },
        },
    );

    const usage = response.data.usage; // 사용량 정보 가져오기

    // Firestore의 읽기, 쓰기, 삭제 사용량 비교
    if (
      usage.firestoreRead > FREE_QUOTA.firestoreRead ||
      usage.firestoreWrite > FREE_QUOTA.firestoreWrite ||
      usage.firestoreDelete > FREE_QUOTA.firestoreDelete
    ) {
      return false; // 무료 한도 초과 → 요청 차단
    }

    return true; // 무료 한도 내 → 요청 허용
  } catch (error) {
    console.error("사용량 확인 실패:", error);
    return true; // API 오류 발생 시 기본적으로 요청 허용
  }
}

/**
 * Firebase 서비스 계정을 통해 액세스 토큰 가져오기
 * @return {Promise<string>}
 */
async function getAccessToken() {
  const token = await admin.credential.applicationDefault().getAccessToken();
  return token.access_token;
}

/**
 * 이메일 저장 Cloud Function - 중복 검사 & 무료 할당량 초과 시 요청 차단
 */
exports.addEmail = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    if (req.method !== "POST") {
      return res.status(405).json({error: "Method Not Allowed"});
    }

    try {
      // 무료 할당량 초과 확인
      const isFree = await isUnderFreeQuota();
      if (!isFree) {
        return res.status(403).json({error: "무료 할당량을 초과하여 요청이 차단되었습니다."});
      }

      const {email} = req.body;

      if (!email ||
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+$/.test(email)) {
        return res.status(400).json({error: "Invalid email format"});
      }

      // 🔴 Firestore에서 중복 이메일 확인
      const emailRef = db.collection("emails").doc(email);
      const emailDoc = await emailRef.get();

      if (emailDoc.exists) {
        return res.status(400).json({error: "이미 저장된 이메일입니다."});
      }

      // 🔵 Firestore에 이메일 저장
      await emailRef.set({
        email,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).json({success: true, message: "이메일 저장 완료!"});
    } catch (error) {
      console.error("Cloud Function Error:", error);
      return res.status(500).json({error: "서버 오류 발생"});
    }
  });
});
