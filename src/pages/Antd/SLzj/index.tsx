import React, { useState } from 'react';
import { Button, Form, Input, Select, Table, message, Cascader } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import DATE from '../../../../public/project/date.png';
import WEEK from '../../../../public/project/week.png';
import MONTH from '../../../../public/project/month.png';
import SUM from '../../../../public/project/sum.png';
import styles from './index.less';

const SLzj: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState([]);
  const [form] = Form.useForm();

  const data = [];
  for (let i = 0; i < 146; i++) {
    data.push({
      id: i,
      name: '双牌水库',
      status: i,
      type: i % 3 == 0 ? '小（1）型' : '小（2）型',
      createTime: '2023-8-14 11:12:30',
      SW: (i * Math.random() * 2).toFixed(2),
      SY: (i * Math.random() * 2).toFixed(2),
      SL: (i * Math.random() * 2).toFixed(2),
      SPWY: (i * Math.random() * 2).toFixed(2),
      CZWY: (i * Math.random() * 2).toFixed(2),
    });
  }

  const options = [
    {
      value: 'lishan',
      label: '里山镇',
      children: [
        {
          value: 'guanfang',
          label: '官房',
        },
        {
          value: 'guanwu',
          label: '观坞村',
        },
        {
          value: 'shanji',
          label: '山基村',
        },
      ],
    },
    {
      value: 'yongchang',
      label: '永昌镇',
      children: [
        {
          value: 'zhaojia',
          label: '赵家坞',
        },
        {
          value: 'wangjia',
          label: '王家',
        },
      ],
    },
  ];
  const handleChange = (value: any) => {
    setSelectedValue(value);
  };

  const columns: any = [
    {
      title: '水库名称',
      dataIndex: 'name',
      key: 'name',
      //   width: 100,
      align: 'center',
    },
    {
      title: '水库类型',
      dataIndex: 'type',
      key: 'type',
      //   width: 100,
      align: 'center',
    },
    {
      title: '监测时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      width: 135,
      onCell: () => ({
        className: styles.td_nowarp,
      }),
      render: (r: any, i: any) =>
        dayjs(i.createTime).format('YYYY.MM.DD HH:mm'),
    },
    {
      title: '当前水位（m）',
      dataIndex: 'SW',
      key: 'SW',
      //   width: 100,
      align: 'center',
    },
    {
      title: '渗压（Pa）',
      dataIndex: 'SY',
      key: 'SY',
      //   width: 100,
      align: 'center',
    },
    {
      title: '渗流（L/s）',
      dataIndex: 'SL',
      key: 'SL',
      //   width: 100,
      align: 'center',
    },
    {
      title: '水平位移(mm)',
      dataIndex: 'SPWY',
      key: 'SPWY',
      //   width: 100,
      align: 'center',
    },
    {
      title: '垂直位移(mm)',
      dataIndex: 'CZWY',
      key: 'CZWY',
      //   width: 100,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (t: any) => {
        if (t == 0 || t == 2) {
          return <span style={{ color: 'red' }}>异常</span>;
        } else {
          return <span style={{ color: 'green' }}>正常</span>;
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      width: 100,
      render: (_text: any, record: any) => {
        return (
          <div className={styles.buttons}>
            <Button
              type="link"
              onClick={() => {
                if (record.status == 0 || record.status == 2) {
                  message.success('异常');
                } else {
                  message.success('正常');
                }
              }}
            >
              详情
            </Button>
          </div>
        );
      },
    },
  ];
  const onFinish = () => {};

  return (
    <div className={styles.container}>
      <header className="header">
        工程运行
        <RightOutlined />
        <span>大坝监测</span>
      </header>
      <div className={styles.data_box}>
        <div className={styles.dataTop}>
          <div className={styles.dataTopItem}>
            <div className={styles.dataTopItemShu}>
              <img src={DATE} alt="" />
            </div>
            <div className={styles.dataTopItemData}>
              <div>水库总数</div>
              <div>146</div>
            </div>
          </div>
          <div className={styles.dataTopItem}>
            <div className={styles.dataTopItemShu}>
              <img src={WEEK} alt="" />
            </div>
            <div className={styles.dataTopItemDataOne}>
              <div className={styles.dataTopItemDataOneItem}>
                <div>自动监测：</div>
                <div>56</div>
              </div>
              <div className={styles.dataTopItemDataOneItem}>
                <div>人工监测：</div>
                <div>90</div>
              </div>
            </div>
          </div>
          <div className={styles.dataTopItem}>
            <div className={styles.dataTopItemShu}>
              <img src={MONTH} alt="" />
            </div>
            <div className={styles.dataTopItemData}>
              <div>预警水库</div>
              <div>0</div>
            </div>
          </div>
          <div className={styles.dataTopItem}>
            <div className={styles.dataTopItemShu}>
              <img src={SUM} alt="" />
            </div>
            <div className={styles.dataTopItemData}>
              <div>累计库容（万立方米）</div>
              <div>1572.46</div>
            </div>
          </div>
        </div>
        <div className={styles.form_style}>
          <Form layout="inline" colon={false} form={form} onFinish={onFinish}>
            <Form.Item label="水库名称" name="roleName">
              <Input placeholder="水库名称" />
            </Form.Item>
            <Form.Item label="水库类型" name="status" initialValue="">
              <Select style={{ width: 100 }}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="0">小（1）型</Select.Option>
                <Select.Option value="1">小（2）型</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="行政区划" name="statusOne" initialValue="">
              <Cascader
                options={options}
                onChange={handleChange}
                placeholder="请选择"
                style={{ width: 220 }}
              />
              {/* {selectedValue.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  当前选中值：{selectedValue.join(' / ')}
                </div>
              )} */}
            </Form.Item>
            <p className={styles.btn}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ margin: '0px 10px' }}
              >
                查询
              </Button>
            </p>
          </Form>
          <div>
            <Button type="primary" style={{ border: 'none', marginRight: 20 }}>
              刷新
            </Button>
            <Button type="primary" style={{ border: 'none' }}>
              导出
            </Button>
          </div>
        </div>
        <div className={styles.table_stype}>
          <Table
            columns={columns as []}
            dataSource={data}
            pagination={{
              total: 146,
              showSizeChanger: true,
              position: ['bottomCenter'],
              showTotal: () => '共 ' + 146 + ' 条',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SLzj;
