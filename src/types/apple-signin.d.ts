interface AppleAuthorizationResponse {
  authorization: {
    code: string;
    id_token: string;
    state?: string;
  };
  user?: {
    email?: string;
    name?: {
      firstName?: string;
      middleName?: string;
      lastName?: string;
    };
  };
}

interface AppleSignInError {
  error: string;
}

interface AppleAuthInit {
  clientId: string;
  scope: string;
  redirectURI: string;
  state?: string;
  nonce?: string;
  usePopup?: boolean;
}

interface AppleAuth {
  init(config: AppleAuthInit): void;
  signIn(): Promise<AppleAuthorizationResponse>;
  renderButton(): void;
}

interface AppleIDNamespace {
  auth: AppleAuth;
}

interface AppleSignInSuccessEvent extends Event {
  detail: AppleAuthorizationResponse;
}

interface AppleSignInFailureEvent extends Event {
  detail: AppleSignInError;
}

declare global {
  // eslint-disable-next-line no-var
  var AppleID: AppleIDNamespace | undefined;

  interface WindowEventMap {
    AppleIDSignInOnSuccess: AppleSignInSuccessEvent;
    AppleIDSignInOnFailure: AppleSignInFailureEvent;
  }
}

export {};
