const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({
  origin: true,
  methods: ["POST", "OPTIONS"],
});

/**
 * 이메일 저장 Cloud Function - 중복 검사 없이 저장
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
      const {email} = req.body;

      if (!email ||
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+$/.test(email)) {
        return res.status(400).json({error: "Invalid email format"});
      }

      // Firestore에 저장 (중복 검사 없이)
      await db.collection("emails").doc(email).set(
          {
            email,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          },
          {merge: true}, // 이미 존재하면 무시
      );

      return res.status(200).json({success: true, message: "이메일 저장 완료!"});
    } catch (error) {
      console.error("Cloud Function Error:", error);
      return res.status(500).json({error: "서버 오류 발생"});
    }
  });
});
