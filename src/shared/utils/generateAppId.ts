import { v4 } from "uuid";

export default function generateAppId() {
  const id = v4();

  return id;
}
