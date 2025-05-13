export const messages = {
  nameRequired: {
    message: 'Name is required.',
    example: 'John Doe',
    description: 'Full name of the user.'
  },
  nameMinLength: {
    message: 'Name must be at least 2 characters.',
    example: 'Jo',
    description: 'Name must contain at least 2 characters.'
  },
  emailRequired: {
    message: 'Email is required.',
    example: 'john@example.com',
    description: 'Email address of the user.'
  },
  emailInvalid: {
    message: 'Enter a valid email address.',
    example: 'john@example.com',
    description: 'A valid email address format is required.'
  },
  passwordRequired: {
    message: 'Password is required.',
    example: 'password123',
    description: 'Password for the user account.'
  },
  passwordMinLength: {
    message: 'Password must be at least 6 characters.',
    example: 'secret1',
    description: 'Password must contain at least 6 characters.'
  },
  roleRequired: {
    message: 'Role is required.',
    example: 'Student',
    description: 'Role assigned to the user.'
  },
  roleInvalid: {
    message: 'Role must be either "Student" or "Teacher".',
    example: 'Student',
    description: 'Allowed roles: Student or Teacher.'
  },
  userCreatedSuccess: {
    message: 'User created successfully.',
    description: 'User account was created successfully.'
  },
  userUpdatedSuccess: {
    message: 'User updated successfully.',
    description: 'User information was updated successfully.'
  },
  userDeletedSuccess: {
    message: 'User deleted successfully.',
    description: 'User account was deleted successfully.'
  },
  loginSuccess: {
    message: 'Login successful.',
    description: 'User logged in successfully.'
  },
  loginFailed: {
    message: 'Invalid email or password.',
    description: 'Login attempt failed due to incorrect credentials.'
  },
  userNotFound: {
    message: 'User not found.',
    description: 'No user found with the given information.'
  },
  courseNameRequired: {
    message: 'Course name is required.',
    example: 'Backend Development',
    description: 'Name of the course.'
  },
  courseDurationRequired: {
    message: 'Course duration is required.',
    example: '12 months',
    description: 'Duration of the course.'
  },
  courseDetailsRequired: {
    message: 'Course details are required.',
    example: 'Fundamentals of web development and backend systems.',
    description: 'Overview of course content.'
  },
  success: {
    message: 'Operation completed successfully.',
    description: 'Generic success confirmation.'
  },
  error: {
    message: 'An error occurred. Please try again.',
    description: 'Generic error message.'
  },
  unauthorized: {
    message: 'You are not authorized to perform this action.',
    description: 'Authorization error.'
  },
  forbidden: {
    message: 'Access to this resource is forbidden.',
    description: 'Permission denied.'
  },
  notFound: {
    message: 'Resource not found.',
    description: 'Requested resource could not be located.'
  },
  validationError: {
    message: 'Validation failed. Check your input.',
    description: 'Input validation failed.'
  },
  attendanceMarkedSuccess: {
    message: 'Attendance marked successfully.',
    description: 'Attendance recorded successfully.'
  },
  attendanceAlreadyMarked: {
    message: 'Attendance already marked for this date.',
    description: 'Duplicate attendance entry.'
  },
  attendanceNotFound: {
    message: 'Attendance record not found.',
    description: 'No attendance data found.'
  },
  attendanceDateRequired: {
    message: 'Attendance date is required.',
    description: 'Date is mandatory for marking attendance.'
  },
  attendanceStatusRequired: {
    message: 'Attendance status is required.',
    description: 'Status is mandatory for attendance.'
  },
  profileUpdateSuccess: {
    message: 'Profile updated successfully.',
    description: 'User profile was updated.'
  },
  profileNotFound: {
    message: 'Profile not found.',
    description: 'No profile data found.'
  },
  profileImageUpdateSuccess: {
    message: 'Profile image updated successfully.',
    description: 'Image update was successful.'
  },
  profileImageUpdateFailed: {
    message: 'Failed to update profile image.',
    description: 'Profile image update failed.'
  },
  courseCreatedSuccess: {
    message: 'Course created successfully.',
    description: 'New course was added.'
  },
  courseUpdatedSuccess: {
    message: 'Course updated successfully.',
    description: 'Course information was updated.'
  },
  courseDeletedSuccess: {
    message: 'Course deleted successfully.',
    description: 'Course was removed.'
  },
  courseNotFound: {
    message: 'Course not found.',
    description: 'No course found with the given details.'
  },
  courseEnrollmentSuccess: {
    message: 'Enrolled in the course successfully.',
    description: 'Course enrollment was successful.'
  },
  courseEnrollmentFailed: {
    message: 'Course enrollment failed.',
    description: 'Unable to enroll in the course.'
  },
  courseAlreadyEnrolled: {
    message: 'Already enrolled in this course.',
    description: 'Duplicate enrollment attempt.'
  },
  tokenExpired: {
    message: 'Session expired. Please log in again.',
    description: 'Authentication token has expired.'
  },
  invalidToken: {
    message: 'Invalid authentication token.',
    description: 'Provided token is not valid.'
  },
  passwordResetSuccess: {
    message: 'Password reset successful.',
    description: 'Password was reset successfully.'
  },
  passwordResetFailed: {
    message: 'Password reset failed.',
    description: 'Could not reset the password.'
  },
  passwordMismatch: {
    message: 'Passwords do not match.',
    description: 'Confirmation password does not match the new password.'
  },
  fileUploadSuccess: {
    message: 'File uploaded successfully.',
    description: 'File was uploaded successfully.'
  },
  fileUploadFailed: {
    message: 'File upload failed.',
    description: 'Error occurred during file upload.'
  },
  invalidFileType: {
    message: 'Invalid file type.',
    description: 'Only supported file types are allowed.'
  },
  fileSizeExceeded: {
    message: 'File size exceeds the allowed limit.',
    description: 'Uploaded file is too large.'
  }
};

export const userRoles = ['Student', 'Teacher'] as const;

export const statusCodes = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;
