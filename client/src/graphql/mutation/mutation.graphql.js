import { gql } from "@apollo/client";

export const signIn = gql`
  mutation signIn($input: userSignInInput) {
    signIn(input: $input) {
      token
    }
  }
`;
