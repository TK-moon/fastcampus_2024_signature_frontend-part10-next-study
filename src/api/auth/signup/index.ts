import { isUserExist, signupUser } from "./queries";
import { SignupRequest, SignupResponse } from "./types";

async function handler(req: SignupRequest, res: SignupResponse) {
  /** 메소드 제한 */
  if (req.method !== "POST") {
    res.status(400).json({ error_message: "Bad request" });
    return;
  }

  /** body 가져오기 */
  const { name, email, password } = req.body;

  /** body 값 예외처리 */
  if (!name || !email || !password) {
    res.status(500).json({ error_message: "Invalid input" });
    return;
  }

  /** 유저가 존재하는지 확인 */
  const is_exist = await isUserExist(email);
  /** 존재하면 에러 반환 */
  if (is_exist) {
    res.status(400).json({ error_message: "User already exist" });
    return;
  }
  /** 회원가입 */

  const { is_success } = await signupUser(name, email, password);

  /** 성공하면 성공 반환 */

  if (is_success) {
    res.status(201).json({ is_success: true });
    return;
  }
  /** 실패하면 에러 반환 */

  res.status(500).json({ error_message: "Failed to signup" });
}

export { handler as signupHandler };
