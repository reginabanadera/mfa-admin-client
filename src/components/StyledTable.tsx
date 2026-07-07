import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface TableProps<T> {
  data: T[];
  // columns: {
  //   title: string,
  //   dataIndex: string | (string & keyof T); // ✅ Fix here
  //   key: string
  // }[];
  columns: ColumnsType<T>; // ✅ Accepts both flat and grouped columns
  rowKey: string;
}


export const StyledTable = <T extends object>({data, columns, rowKey}: TableProps<T>) => {
  
  return (
    <Table 
    columns={columns} 
    dataSource={data}
    components={{
      body: {
        cell: ({ children }) => (
          <td style={{ fontSize: "12px", padding: "10px", letterSpacing: "0.7px", color: "#555" }}>
            {children}
          </td>
        ),
      },
    }} 
    rowKey={rowKey}

    pagination={{
    pageSize: 10,
       showTotal: (total, range) => `${range[0]}–${range[1]} of ${total} users`
      }}>
    </Table>

    
  )
}





