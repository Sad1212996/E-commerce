const bcryptjs = require('bcryptjs');
const crypto = require('crypto');

describe("Security Functions & Logic Verification", () => {
    test("bcrypt password hashing and comparison works correctly", async () => {
        const password = "mySecurePassword123";
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        expect(hashedPassword).not.toEqual(password);
        const isMatch = await bcryptjs.compare(password, hashedPassword);
        expect(isMatch).toBe(true);
    });

    test("crypto.randomInt generates valid 6-digit OTP", () => {
        const otp = crypto.randomInt(100000, 1000000).toString();
        expect(otp).toMatch(/^\d{6}$/);
        const otpNum = parseInt(otp, 10);
        expect(otpNum).toBeGreaterThanOrEqual(100000);
        expect(otpNum).toBeLessThan(1000000);
    });

    test("OTP hashing and comparison", async () => {
        const otp = "654321";
        const hashedOtp = await bcryptjs.hash(otp, 10);

        expect(hashedOtp).not.toEqual(otp);
        const isValid = await bcryptjs.compare(otp, hashedOtp);
        expect(isValid).toBe(true);
        const isInvalid = await bcryptjs.compare("000000", hashedOtp);
        expect(isInvalid).toBe(false);
    });
});
