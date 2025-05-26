

export const htmlRegister = (otp) => {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h1 style="color: #2c3e50; text-align: center;">Hello, Utsab 👋</h1>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <h2 style="color: #007BFF;">Verify Your Email Address</h2>
          <p style="font-size: 16px; color: #333;">
            Thank you for signing up. To complete your registration, please use the following One-Time Password (OTP) to verify your email address:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 28px; font-weight: bold; color: #2d3436; letter-spacing: 4px;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #555;">
            This OTP is valid for <strong>5 minutes</strong>. If it expires, you can request a new one.
          </p>
          <p style="font-size: 14px; color: #999;">
            If you didn’t initiate this request, you can safely ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="text-align: center; font-size: 13px; color: #aaa;">&copy; ${new Date().getFullYear()} Utsab's Auth System. All rights reserved.</p>
        </div>
      </div>
    `;
};

export const htmlLogin = (otp) => {
    return `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h1 style="color: #2c3e50; text-align: center;">Hello, Utsab 👋</h1>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <h2 style="color: #007BFF;">Verify Your Email Address For Login</h2>
          <p style="font-size: 16px; color: #333;">
            Thank you for request. To Login, please use the following One-Time Password (OTP) to verify your email address:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 28px; font-weight: bold; color: #2d3436; letter-spacing: 4px;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #555;">
            This OTP is valid for <strong>5 minutes</strong>. If it expires, you can request a new one.
          </p>
          <p style="font-size: 14px; color: #999;">
            If you didn’t initiate this request, you can safely ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="text-align: center; font-size: 13px; color: #aaa;">&copy; ${new Date().getFullYear()} Utsab's Auth System. All rights reserved.</p>
        </div>
      </div>
    `;
};
