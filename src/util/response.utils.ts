import { ResponseDto } from '../movies/dto/response-dto';
import { ResultCode } from '../constant/result-code';

export class ResponseUtils {
  public static error(code: string, msg?: string, data?: any): ResponseDto {
    return {
      success: false,
      code: code,
      msg: msg,
      data: data,
    };
  }

  static success(msg?: string, data?: any): ResponseDto {
    return {
      success: true,
      code: ResultCode.FGP_0000.toString(),
      msg: msg,
      data: data,
    };
  }
}
