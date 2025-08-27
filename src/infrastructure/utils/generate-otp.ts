export function generateOtp(length = 6) {
    const max = 10 ** length;
    const otp = Math.floor(Math.random() * max).toString().padStart(length, '0');
    return otp;
}
