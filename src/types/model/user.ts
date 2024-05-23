export type User = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
};

// {
//     "iss": "https://accounts.google.com",
//     "azp": "448285983486-hgpqrbkd98l3cbp4b33a9e6ohrsferfs.apps.googleusercontent.com",
//     "aud": "448285983486-hgpqrbkd98l3cbp4b33a9e6ohrsferfs.apps.googleusercontent.com",
//     "sub": "117463429216227286833",
//     "email": "yadavsandeep775@gmail.com",
//     "email_verified": true,
//     "nbf": 1716485065,
//     "name": "Sandeep Yadav",
//     "picture": "https://lh3.googleusercontent.com/a/ACg8ocIirqYU4BUmbkWZhr2AfaQifvjEhbKrDT8y7caGlTOamkJyoWr3pg=s96-c",
//     "given_name": "Sandeep",
//     "family_name": "Yadav",
//     "iat": 1716485365,
//     "exp": 1716488965,
//     "jti": "b053801589d9cbb20dfadf81d318aea07332287f"
// }
