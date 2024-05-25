export type User = {
  first_name: string;
  last_name: string;
  mobile: null | string;
  email: string;
  profile_url: string | null;
  uuid: string;
  role: "HOST" | "VENDOR" | "GUEST" | null;
  refresh: string[];
  access: string;
};

// Example of a user object
// {
//   first_name: "vikas";
//   last_name: "gaikwad";
//   mobile: null;
//   email: "vikas@inkle.io";
//   profile_url: null;
//   uuid: "9b4ff1b0-ccd3-4854-b0ea-d0cecc74f9fc";
//   role: "HOST";
//   refresh: [
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNzEzMTQyNiwiaWF0IjoxNzE2NTI2NjI2LCJqdGkiOiI0NmNlYjQ2NjM5NTA0N2E1YmQ4ODVhNDU0NzE0ZjBkNiIsInVzZXJfaWQiOjJ9.fyDTTgmWBzc4OsRvI7g60WglWxqvhmiHgBIeCPpJ0dk",
//   ];
//   access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MTMxNDI2LCJpYXQiOjE3MTY1MjY2MjYsImp0aSI6IjZjMzdmYTQ4YmZmZDRmOGViYWMwYmQzNTEyNTlhOGUxIiwidXNlcl9pZCI6Mn0.88UxeTpyykeO1hzGI5HPaGFLu8mgyQrUPqKLmV2aBoo";
// },

// Signup response  FIXME: Update this
//  - don't add default role

// {
//   "first_name": "",
//   "last_name": "",
//   "mobile": null,
//   "email": "sandeep@inkle.io",
//   "profile_url": null,
//   "uuid": "27dd7a87-8e40-4c21-a31e-e2f0398b9ec8",
//   "role": "HOST",
//   "refresh": [
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxNzIxNDQ3OCwiaWF0IjoxNzE2NjA5Njc4LCJqdGkiOiIwNWIzYmJhYTIzZmU0ZTQ2OTg0YWI1OWIxMzVmNTRlYyIsInVzZXJfaWQiOjN9.U2WTDfkGVku4f9aaf6ZRc5AJ71p-WN-kp6wFTd8LyrE"
//   ],
//   "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MjE0NDc4LCJpYXQiOjE3MTY2MDk2NzgsImp0aSI6IjM2NWYwNGZlMzk5MTRlZWY5MzY0ZDNiZTVlNjFlZTU2IiwidXNlcl9pZCI6M30.D7q5OklQfx36hyHEGfD3nPt6IUV5G9G5RkizbMgsCEg"
// }
