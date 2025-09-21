const functions = require('firebase-functions');
const {GoogleAuth} = require('google-auth-library');
const axios = require('axios');

exports.verifyIntegrityToken = functions.https.onCall(async (data, context) => {
  try {
    const integrityToken = data.token;
    if (!integrityToken) throw new Error("No token provided");

    const auth = new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/playintegrity"],
    });

    const client = await auth.getClient();
    const projectNumber = "800138348638"; // replace with your project number

    const url = https://playintegrity.googleapis.com/v1/projects/${projectNumber}/integrityTokens:decode;

    const res = await client.request({
      url,
      method: "POST",
      data: { integrityToken },
    });

    return { success: true, integrity: res.data };
  } catch (error) {
    console.error("Integrity check failed:", error);
    return { success: false, error: error.message };
  }
});
