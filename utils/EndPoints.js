const base = process.env.NEXT_PUBLIC_API_URI;

// auth
export const StudentSignInEnd = base + "/student/signin";
export const StudentSignUpEnd = base + "/student/signup";
export const StudentSignInWithGoogle = base + "/student/google";
export const StudentSignInWithFacebook = base + "/student/facebook";
export const TokenizeSignIn = base + "/student/tokenize_signin";

// user profile
export const GetStudentProfileEnd = base + "/student/profile";
export const EditStudentProfileEnd = base + "/student/edit_profile";

// reset password
export const ForgotPassGotOtp = base + "/student/forgot-pass-get-otp";
export const SetForgotPassEnd = base + "/student/set-pass-forget-pass";

// admin reset password
export const AdminForgotPassGotOtp = base + "/admin/forgot-pass-get-otp";
export const AdminSetForgotPassEnd = base + "/admin/set-pass-forget-pass";

// verify
export const GetNewOTPEnd = base + "/student/get-new-otp";
export const PutOTPEnd = base + "/student/verify-account";

//
export const GetCategoryEnd = base + "/category/get";
export const GetAllCategoryEnd = base + "/category/category_tree_view";

// courses
export const GetCourseEnd = base + "/course/get";
export const GetCourseEndNew = "/course/get";
export const GetMyCourseEnd = base + "/student/get_my_courses";
export const FullCourseTreeEnd = base + "/full_course/get_full_course_tree";
export const FullCourseTreeEndNew = "/full_course/get_full_course_tree";
export const GetAllTagsEnd = base + "/course/get_all_filter";

//content
export const GetContent = base + '/content/get'

//  order
export const CreateOrderEnd = base + "/order/create";
export const OrderGetEnd = base + "/order/get_by_student";
export const OrderEditEnd = base + "/order/edit_by_student";

// lecture
export const GetLectureEnd = base + "/lecture/get";
export const GetLectureEndNew = "/lecture/get";

// admin
export const AdminLoginEnd = base + "/admin/login";
export const AdminProfileEnd = base + "/admin/profile";

// quiz
export const QuizAttemptEditEnd = base + "/quiz_attempt/edit";
export const QuizAttemptCreateEnd = base + "/quiz_attempt/create";
export const QuizAttemptGetEnd = base + "/quiz_attempt/get";

// report
export const GetReportEnd = base + "/report/get";

// static
export const GetStaticEnd = base + "/static/get";

//coupon
export const ApplyCoupon = base + "/coupon/apply_coupon";

// video
export const VideoVimeoEnd = base + "/video/get_vimeo";