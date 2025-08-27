    # File Tree: backend

Generated on: 8/20/2025, 11:03:41 PM
Root path: `d:\evnetHub-app\backend`

```
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 logs/
│   ├── 📋 combined.log 🚫 (auto-hidden)
│   └── 📋 error.log 🚫 (auto-hidden)
├── 📁 node_modules/ 🚫 (auto-hidden)
├── 📁 src/
│   ├── 📁 application/
│   │   ├── 📁 admin/
│   │   │   └── 📄 UserManagementUsecase.ts
│   │   ├── 📁 interface/
│   │   │   ├── 📁 admin/
│   │   │   │   ├── 📄 ISeedAdmin.ts
│   │   │   │   └── 📄 IUserManagementUseCase.ts
│   │   │   ├── 📁 common/
│   │   │   │   ├── 📄 ILoggerService.ts
│   │   │   │   └── 📄 ISocketService.ts
│   │   │   ├── 📁 organizer/
│   │   │   └── 📁 user/
│   │   │       ├── 📄 IAuthMiddleware.ts
│   │   │       ├── 📄 IChangePasswordUsecase.ts
│   │   │       ├── 📄 IEmailService.ts
│   │   │       ├── 📄 IForgetPasswordUsecase.ts
│   │   │       ├── 📄 IGenerateOtpUseCase.ts
│   │   │       ├── 📄 IHashService.ts
│   │   │       ├── 📄 ILoginUserUseCase.ts
│   │   │       ├── 📄 ILogoutUseCase.ts
│   │   │       ├── 📄 IRefreshTokenUseCase.ts
│   │   │       ├── 📄 IRegisterUserUsecase.ts
│   │   │       ├── 📄 IResendOtpUseCase.ts
│   │   │       ├── 📄 IResetPasswordOTPUseCase.ts
│   │   │       ├── 📄 ITokenService.ts
│   │   │       └── 📄 IVerifyOtpUseCase.ts
│   │   ├── 📁 mapper/
│   │   │   └── 📁 user/
│   │   │       ├── 📄 UserMapper.ts
│   │   │       └── 📄 usersMapper.ts
│   │   ├── 📁 organizer/
│   │   └── 📁 user/
│   │       └── 📁 auth/
│   │           ├── 📄 ChangePasswordUseCase.ts
│   │           ├── 📄 ForgetPasswordUseCase.ts
│   │           ├── 📄 GenerateOtpUseCase.ts
│   │           ├── 📄 GenerateRefreshTokenUseCase.ts
│   │           ├── 📄 LoginUserUseCase.ts
│   │           ├── 📄 LogoutUserUseCase.ts
│   │           ├── 📄 RegisterUserUsecase.ts
│   │           ├── 📄 ResendOtp.ts
│   │           ├── 📄 ResetPasswordUseCase.ts
│   │           └── 📄 VerifyOtpUseCase.ts
│   ├── 📁 config/
│   │   ├── 📁 mongoose/
│   │   │   └── 📄 DbConnection.ts
│   │   └── 📁 reddis/
│   │       └── 📄 Redis.ts
│   ├── 📁 di/
│   │   ├── 📁 admin/
│   │   │   └── 📄 containersList.ts
│   │   └── 📄 container.ts
│   ├── 📁 domain/
│   │   ├── 📁 dtos/
│   │   │   └── 📁 user/
│   │   │       ├── 📄 ChangePasswordDTO.ts
│   │   │       ├── 📄 ForgetPasswordDTO.ts
│   │   │       ├── 📄 RegisterUserDTO.ts
│   │   │       ├── 📄 ResetPasswordDTO.ts
│   │   │       ├── 📄 UserResponseDTO.ts
│   │   │       ├── 📄 VerifyOTPDTO.ts
│   │   │       └── 📄 userUpdateDTO.ts
│   │   ├── 📁 entities/
│   │   │   ├── 📄 IAdmin.ts
│   │   │   ├── 📄 IOrganizer.ts
│   │   │   └── 📄 User.ts
│   │   ├── 📁 repositories/
│   │   │   └── 📁 user/
│   │   │       └── 📄 IUserRepository.ts
│   │   └── 📁 types/
│   │       ├── 📄 IDecodedUserPayload.ts
│   │       └── 📄 IUserLoginResponse.ts
│   ├── 📁 infrastructure/
│   │   ├── 📁 commonResponseModel/
│   │   │   └── 📄 ApiResponse.ts
│   │   ├── 📁 db/
│   │   │   └── 📁 models/
│   │   │       └── 📄 UserModel.ts
│   │   ├── 📁 errors/
│   │   │   └── 📄 errorClass.ts
│   │   ├── 📁 interface/
│   │   │   ├── 📁 enums/
│   │   │   │   └── 📄 HttpStatusCode.ts
│   │   │   ├── 📄 IAuthenticateRequest.ts
│   │   │   ├── 📄 IAuthenticatedRequest.ts
│   │   │   ├── 📄 ICacheService.ts
│   │   │   ├── 📄 IOtpService.ts
│   │   │   ├── 📄 IUserTokenPayload.ts
│   │   │   └── 📄 IUsersDocument.ts
│   │   ├── 📁 middleware/
│   │   │   └── 📄 errorHandling.ts
│   │   ├── 📁 repositories/
│   │   │   ├── 📄 BaseRepository.ts
│   │   │   └── 📄 UserRepository.ts
│   │   ├── 📁 services/
│   │   │   ├── 📁 JwT/
│   │   │   │   ├── 📄 JWTToken.ts
│   │   │   │   └── 📄 TokenService.ts
│   │   │   ├── 📁 hashing/
│   │   │   │   ├── 📄 BcryptHashService.ts
│   │   │   │   └── 📄 HashService.ts
│   │   │   ├── 📁 logger/
│   │   │   │   └── 📄 loggerService.ts
│   │   │   ├── 📁 nodeMailer/
│   │   │   │   ├── 📄 EmailService.ts
│   │   │   │   └── 📄 NodeMailerEmailService.ts
│   │   │   └── 📁 otp/
│   │   │       ├── 📄 OtpService.ts
│   │   │       └── 📄 RedisCacheService.ts
│   │   └── 📁 websocket/
│   │       ├── 📄 baseSocketService.ts
│   │       └── 📄 userSocketService.ts
│   ├── 📁 interface/
│   │   ├── 📁 controllers/
│   │   │   ├── 📁 admin/
│   │   │   │   └── 📄 userListController.ts
│   │   │   └── 📁 user/
│   │   │       └── 📄 AuthController.ts
│   │   ├── 📁 middleware/
│   │   │   ├── 📄 AuthMiddleWareService.ts
│   │   │   └── 📄 AuthenticationMiddleware.ts
│   │   └── 📁 routes/
│   │       ├── 📁 admin/
│   │       │   └── 📄 adminRoutes.ts
│   │       ├── 📁 organizer/
│   │       │   └── 📄 organizerRoutes.ts
│   │       └── 📁 user/
│   │           └── 📄 userRouts.ts
│   ├── 📁 utils/
│   │   ├── 📄 HandleErrorUtility.ts
│   │   ├── 📄 SeedAdmin.ts
│   │   └── 📄 seedAdminRunner.ts
│   └── 📄 app.ts
├── 🔒 .env 🚫 (auto-hidden)
├── 📄 .eslintrc.json
├── 🚫 .gitignore 🚫 (auto-hidden)
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 tsconfig.json
```

---
*Generated by FileTree Pro Extension*