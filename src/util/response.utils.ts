import { ResponseDto } from '../movies/dto/response-dto';
import { ResultCode } from '../constant/result-code';
import MessageConstant from '../constant/message-constant';

export class ResponseUtils {
  public static error(code: string, msg?: string, data?: any): ResponseDto {
    return {
      success: false,
      code: code,
      msg: msg,
      data: data,
    };
  }

  static successWMsg(msg?: string, data?: any): ResponseDto {
    return {
      success: true,
      code: ResultCode.DKY_0000,
      msg: msg,
      data: data,
    };
  }

  static success(data?: any): ResponseDto {
    return {
      success: true,
      code: ResultCode.DKY_0000,
      msg: MessageConstant.SUCCESS,
      data: data,
    };
  }
}
