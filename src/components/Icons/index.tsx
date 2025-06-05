import Icon from '@ant-design/icons';
import type { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>;
export type ArrowProps = Partial<
  NativeButtonProps & AnchorButtonProps & IconComponentProps
>; // 最终将所有的属性合并

const Name = () => (
  <svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em">
    <path d="M27.136 606.208h188.416L27.136 902.656v27.136h296.448v-53.76H134.656l188.928-296.448v-27.136l-299.008 0.512z m188.416-512h-80.896L0 471.552h80.896l27.136-108.032h134.656l27.136 108.032h80.896L215.552 94.208zM134.656 309.76l35.84-134.656 45.056 134.656h-80.896z m816.64-70.144H477.184c-39.936 0-72.704-32.768-72.704-72.704 0-39.936 32.768-72.704 72.704-72.704h474.112c39.936 0 72.704 32.768 72.704 72.704 0 39.936-32.768 72.704-72.704 72.704z m0 690.176H477.184c-39.936 0-72.704-32.768-72.704-72.704 0-39.936 32.768-72.704 72.704-72.704h474.112c39.936 0 72.704 32.768 72.704 72.704 0 39.936-32.768 72.704-72.704 72.704z m0-345.088H477.184c-39.936 0-72.704-32.768-72.704-72.704 0-39.936 32.768-72.704 72.704-72.704h474.112c39.936 0 72.704 32.768 72.704 72.704 0 39.936-32.768 72.704-72.704 72.704z" />
  </svg>
);

// 名字排序
export const NameType = (props: Partial<ArrowProps>) => (
  <Icon component={Name} {...props} />
);

// 创建箭头
const Arrow = () => (
  <svg viewBox="0 0 1024 1024" fill="currentColor" width="1em" height="1em">
    <path d="M512 693.333333c-14.933333 0-29.866667-4.266667-40.533333-14.933333l-277.33333399-234.666667c-27.733333-23.466667-29.866667-64-8.53333301-89.6 23.466667-27.733333 64-29.866667 89.6-8.53333299L512 546.133333l236.8-200.53333299c27.733333-23.466667 68.266667-19.19999999 89.6 8.53333299 23.466667 27.733333 19.19999999 68.266667-8.53333301 89.6l-277.33333399 234.666667c-10.666667 10.666667-25.6 14.933333-40.533333 14.933333z" />
  </svg>
);

export const ArrowType = (props: Partial<ArrowProps>) => (
  <Icon component={Arrow} {...props} />
);
