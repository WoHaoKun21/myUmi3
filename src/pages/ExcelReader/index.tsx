import { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelReader = () => {
  const [data, setData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<any[]>([]);

  // 模拟的Excel数据（实际使用时可以从文件读取）
  const sampleExcelData: any[] = [
    ['姓名', '年龄', '城市', '职业'],
    ['张三', 28, '北京', '工程师'],
    ['李四', 32, '上海', '设计师'],
    ['王五', 25, '广州', '产品经理'],
    ['赵六', 30, '深圳', '市场专员'],
  ];

  // 处理文件上传
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // 获取第一个工作表
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      // 转换为JSON
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      if (jsonData.length > 0) {
        setHeaders(jsonData[0]); // 第一行作为表头
        setData(jsonData.slice(1)); // 剩余行作为数据
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // 加载示例数据
  const loadSampleData = () => {
    setHeaders(sampleExcelData[0]);
    setData(sampleExcelData.slice(1));
  };

  return (
    <div style={{ padding: 20, width: 800, margin: '0 auto' }}>
      <h2>Excel文件 读取器</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileUpload}
          style={{ marginRight: '10px' }}
        />
        <button onClick={loadSampleData}>加载示例数据</button>
      </div>

      {data.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    style={{
                      padding: '10px',
                      border: '1px solid #ddd',
                      textAlign: 'left',
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell: any, cellIndex: any) => (
                    <td
                      key={cellIndex}
                      style={{ padding: '8px', border: '1px solid #ddd' }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.length === 0 && (
        <div style={{ marginTop: '20px', color: '#666' }}>
          <p>请上传Excel文件或点击"加载示例数据"按钮</p>
          <p>支持格式: .xlsx, .xls, .csv</p>
        </div>
      )}
    </div>
  );
};

export default ExcelReader;
