export default interface Toast {
  message: string;
  show: boolean;
  type: "success" | "info" | "error";
}
