import nodemailer from "nodemailer";

export default async function sendEmail(data) {
    const from = "alirezaghanbari96@gmail.com";
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: from,
            pass: "cjzm gunt ahmr tcpr", // بهتر است پسورد را از محیط‌های امن مثل environment variables بخوانید
        },
    });
    try {
        const info = await transporter.sendMail({ ...data, from });
        return info;
    } catch (error) {
        throw new Error(error.message);
    }
}
