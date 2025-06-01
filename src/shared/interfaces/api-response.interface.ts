interface ApiResponse<T = any> {
  success: boolean;
  cod_error: string; // "00" para éxito, otro código para errores
  message_error: string;
  data?: T;
}