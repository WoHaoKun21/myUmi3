import { MethodEnum } from '@/enums';
import { request } from 'umi';
//                            通用接口
// 用户退出
export function loginOut(token: any) {
  return request(`/logout?token=${token}`, {
    method: MethodEnum.GET,
  });
}
