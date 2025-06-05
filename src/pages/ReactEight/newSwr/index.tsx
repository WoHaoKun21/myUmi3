import useSWR from 'swr';
import Nginx from './Nginx';
const NewSwr = () => {
  const fetcher = (url: string) =>
    fetch(url, { method: 'POST' }).then((r) => r.json());

  const { data, error } = useSWR('/test', fetcher);

  console.log('数据：', data, '错误：', error);

  return (
    <>
      <h3>新hooks测试：未处理</h3>
      <p>数据：{`${data} + ${error}`}</p>
      <Nginx />
    </>
  );
};
export default NewSwr;
