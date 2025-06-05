import { MethodEnum } from '@/enums';
import { request } from 'umi';
// 登陆页面接口
export function postAccountLogin(params: any) {
  return request('/login', {
    method: MethodEnum.POST,
    body: JSON.stringify(params),
  });
}
