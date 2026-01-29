import { z } from "zod";

/* ==================== VALIDATION UTILITIES ==================== */

export const fieldValidators = z.object({
  governmentID: z
    .instanceof(File, { message: "Government ID is required" })
    .refine((file) => file.size > 0 && file.type.startsWith("image/"), {
      message: "Please upload a valid image file (JPG, PNG)",
    }),
  selfie: z
    .instanceof(File, { message: "Selfie is required for face verification" })
    .refine((file) => file.size > 0 && file.type.startsWith("image/"), {
      message: "Please upload a valid selfie image (JPG, PNG)",
    }),
  videoIntroduction: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Please upload a valid video file",
    }),
  socialMediaHandle: z
    .string()
    .max(50, "Social media handle must be less than 50 characters")
    .optional(),
  mobileNumber: z
    .string()
    .regex(/^\d{10,15}$/, "Enter a valid mobile number (10-15 digits)"),
  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const verificationFields = [
  {
    key: "governmentID",
    label: "Upload government ID (for KYC verification)",
    type: "file",
    message: "Please upload a valid government-issued ID",
  },
  {
    key: "selfie",
    label: "Face verification selfie",
    type: "file",
    message: "Upload a selfie for AI face verification with your ID",
  },
  {
    key: "videoIntroduction",
    label: "Video introduction (optional)",
    type: "file",
    message: "Optional: upload a short video introduction",
  },
  {
    key: "socialMediaHandle",
    label: "Social media handle linking (optional)",
    type: "text",
    placeholder: "@yourhandle",
    message: "Optional: link your social media handle",
  },
  {
    key: "mobileNumber",
    label: "Mobile number verification",
    type: "phone",
    placeholder: "9876543210",
    message: "Enter your mobile number to receive OTP",
  },
  {
    key: "otp",
    label: "Enter OTP",
    type: "otp",
    placeholder: "000000",
    message: "Enter the 6-digit OTP sent to your mobile number",
  },
];

/* ==================== API UTILITIES ==================== */

/**
 * Send OTP to the provided phone number
 * @param {string} phoneNumber - Full phone number with country code
 * @returns {Promise<boolean>} - Success status
 */
export const sendOTP = async (phoneNumber) => {
  try {
    // TODO: Replace with actual API endpoint
    // const response = await fetch('/api/send-otp', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ phone: phoneNumber })
    // });
    // const data = await response.json();
    // return data.success;

    console.log("Sending OTP to:", phoneNumber);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw new Error("Failed to send OTP. Please try again.");
  }
};

/**
 * Verify the OTP code
 * @param {string} phoneNumber - Full phone number with country code
 * @param {string} otp - 6-digit OTP code
 * @returns {Promise<{success: boolean, trustScore?: number}>}
 */
export const verifyOTP = async (phoneNumber, otp) => {
  try {
    // TODO: Replace with actual API endpoint
    // const response = await fetch('/api/verify-otp', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ phone: phoneNumber, otp })
    // });
    // const data = await response.json();
    // return data;

    console.log("Verifying OTP:", otp, "for phone:", phoneNumber);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate trust score calculation (replace with actual API response)
    const trustScore = Math.floor(Math.random() * 20) + 80; // Random score between 80-100
    
    return {
      success: true,
      trustScore
    };
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    throw new Error("Invalid OTP. Please try again.");
  }
};

/**
 * Calculate AI trust score based on verification data
 * @param {Object} verificationData - All verification form data
 * @returns {Promise<number>} - Trust score (0-100)
 */
export const calculateTrustScore = async (verificationData) => {
  try {
    // TODO: Replace with actual API endpoint
    // const response = await fetch('/api/calculate-trust-score', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(verificationData)
    // });
    // const data = await response.json();
    // return data.trustScore;

    console.log("Calculating trust score for:", verificationData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate trust score calculation
    let score = 70;
    
    // Add points for each verification
    if (verificationData.governmentID) score += 10;
    if (verificationData.selfie) score += 10;
    if (verificationData.videoIntroduction) score += 5;
    if (verificationData.socialMediaHandle) score += 3;
    if (verificationData.mobileNumber) score += 2;
    
    return Math.min(score, 100);
  } catch (error) {
    console.error("Failed to calculate trust score:", error);
    return 70; // Default score
  }
};