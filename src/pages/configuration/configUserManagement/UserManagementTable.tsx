import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUsers } from "../../../hooks/useUser";
import { Loader } from "../../../components/Loader";
import { StyledTable } from "../../../components/StyledTable";
import { Popconfirm, Tag, message, Button, Space, Select, Form } from "antd";
import { Container, SearchContainer, SearchInput, AddButton, StyledInput } from "../../../components/StyledComponents";
import {  SearchOutlined, UserAddOutlined, QrcodeOutlined, LockTwoTone, EditTwoTone } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface UserInfoProps {
    id: number;
    EmployeeId: string;
    EmployeeName: string;
    EmailAddress: string;
    OASId: string;
    Status: number;
}

const UserManagementTable= ({ onAddUserClick, shouldRefresh }: { onAddUserClick: () => void, shouldRefresh: boolean }) => {

    const {users : fetchedUsers, loading: userLoading, refetch} = useUsers();
    const [ search, setSearch ] = useState("");
    const [ filteredUsers, setFilterUsers ] = useState<UserInfoProps[]>([]);
    const API_URL = import.meta.env.VITE_API_URL; 
    const [ UpdatingId, setUpdatingId ] = useState<string | null>(null);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<Partial<UserInfoProps>>({});
    const [form]  = Form.useForm();

    useEffect(() =>{
        if(fetchedUsers){
          setFilterUsers(fetchedUsers);
        }
      }, [fetchedUsers])

      // ✅ REFRESH when shouldRefresh changes
      useEffect(() => {
        if (shouldRefresh) {
          refetch();
        }
      }, [shouldRefresh]); // 👈 watch shouldRefresh only

      const resetSecretKey = async ( id : string) => {
        try {
          setUpdatingId(id);
          const response = await axios.put(`${API_URL}/auth/userResetKey/${id}`);

          if (response.status === 200) {
            message.success("Secret key has been successfully reset!")
          }
          else{
            message.error("Failed to reset Secret Key.")
          }
        }
        catch(err){
          message.error("Something went wrong")
        }
        finally{
          setUpdatingId(null);
        }
      }


      const resetPassword = async( id : string ) => {
        try{
          setUpdatingId(id);
          const response = await axios.put(`${API_URL}/auth/userResetPass/${id}`);

          if (response.status === 200) {
            message.success("Password has been succesfully reset!");
          }
          else{
            message.error("Failed to reset Password.");
          }
        }
        catch(err){
          message.error("Something went wrong " + err)
        }
        finally{
          setUpdatingId(null);
        }
      }

      const saveEdit = async() => {
        try{
          const values = await form.validateFields();

          const Id = editedData.OASId

          setUpdatingId(values);
          const response = await axios.put(`${API_URL}/auth/userUpdateData/${Id}`, values);
          if(response.status == 200){ 
            message.success("User profile has been successfully edited!");
            refetch();
          }
          else{
            message.error("Failed to update user profile");
          }
        }
        catch(err){
          message.error("Something went wrong: " + err)
        }
        finally{
          setUpdatingId(null);
          cancelEdit()
        }
      }


      const handleEditUser = (record: UserInfoProps)=> {
        setEditingRowId(record.OASId);
        setEditedData({...record})
        form.setFieldsValue({
          EmployeeName: record.EmployeeName,
          EmailAddress: record.EmailAddress,
          Status: record.Status,
        })
      }

      const handleFieldChange = (field: keyof UserInfoProps, value:string | number)=> {
        setEditedData((prev) => ({
          ...prev,
          [field]: value,
        }));
      };

      const cancelEdit = () =>{
        setEditedData({});
        setEditingRowId(null);
      }


      const columns: ColumnsType<UserInfoProps> = [
        {
          title: 'EmployeeId',
          dataIndex: 'EmployeeId',
          key: 'EmployeeId'
        },
        {
          title: 'EmployeeName',
          dataIndex: 'EmployeeName',
          key: 'EmployeeName',
          render: (text, record: UserInfoProps) => 
            editingRowId === record.OASId ? (
              <Form.Item name="EmployeeName" 
              rules={[{
                required: true
              }]}>
                <StyledInput></StyledInput>

              </Form.Item>
            ) : (
                text
            ),
        },
        {
          title: 'Email Address',
          dataIndex: 'EmailAddress',
          key: 'EmailAddress',
          render: (text, record: UserInfoProps) =>
            editingRowId === record.OASId ? (
              <Form.Item name="EmailAddress"
              rules={[{
                required: true,
              }]}>
                <StyledInput></StyledInput>
              </Form.Item>
            ) : (
              text
            ),
        },
        {
          title: 'OAS ID',
          dataIndex: 'OASId',
          key: 'OASId'
        },
        {
          title: 'Status',
          dataIndex: 'Status',
          render: (_:any, record: UserInfoProps) =>
            editingRowId === record.OASId ? (
              <Form.Item name="Status"
              rules={[{
                required: true,
              }]}>
                <Select
                  value={(editedData?.Status ?? record.Status).toString()}
                  onChange={(value) => handleFieldChange('Status', Number(value))}
                  style={{ width: 120 }}
                >
                  <Select.Option value="1">Active</Select.Option>
                  <Select.Option value="0">Inactive</Select.Option>
                </Select>

            </Form.Item>
            ) : (
              <Tag color={record.Status === 1 ? 'green' : 'red'}>
              {record.Status === 1 ? 'Active' : 'Inactive'}
            </Tag>
            ),
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (_: any, record: UserInfoProps) => editingRowId === record.OASId ? (
            <Space>
              <Button type="primary" size="small" htmlType="submit">Save</Button>
              <Button danger size="small" onClick={cancelEdit}>Cancel</Button> {/* danger prop instead of color */}
            </Space>
          ) : (
            <Space size="middle">
              <Popconfirm
                title={<>Are you sure you want to reset the <span style={{ color: 'red', fontStyle: 'italic' }}>Secret Key</span>?</>}
                onConfirm={() => resetSecretKey(record.OASId)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" size="small" loading={UpdatingId === record.OASId}><QrcodeOutlined /></Button>
              </Popconfirm>
      
              <Popconfirm
                title={<>Are you sure you want to reset the <span style={{ color: 'red', fontStyle: 'italic' }}>Password</span>?</>}
                onConfirm={() => resetPassword(record.OASId)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" size="small" loading={UpdatingId === record.OASId}><LockTwoTone /></Button>
              </Popconfirm>
      
              <Button type="link" size="small" onClick={() => handleEditUser(record)}><EditTwoTone /></Button>
            </Space>
          ),
        }
      ];
      

      const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const value = event.target.value.toLowerCase();
        setSearch(value);
    
        const filtered = fetchedUsers.filter((user: UserInfoProps) => {
          const StatusText  = user.Status === 1 ? 'active' : 'inactive';
            
          return (
            (user.id ? user.id.toString().toLowerCase() : '').includes(value) ||
            (user.EmployeeId ? user.EmployeeId.toLowerCase() : '').includes(value) ||
            (user.EmployeeName ? user.EmployeeName.toLowerCase() : '').includes(value) ||
            (user.EmailAddress ? user.EmailAddress.toLowerCase() : '').includes(value) ||
            (user.OASId ? user.OASId.toLowerCase() : '').includes(value) ||
            (user.Status ? user.Status.toString().toLowerCase() : '').includes(value) ||
            StatusText.includes(value)
          );
        });
        setFilterUsers(filtered);
      };

      
      
      if(userLoading) return <Loader></Loader>

    return (
        <Container>
            <SearchContainer>
                <SearchInput placeholder="Search by Employee ID, Name, OASId or Status" value={search} onChange={handleSearch} suffix={<SearchOutlined />}></SearchInput>
                <AddButton type="primary" onClick={onAddUserClick}><UserAddOutlined></UserAddOutlined> ADD USER </AddButton>
            </SearchContainer>   
            <Form form={form} onFinish={saveEdit}>
            <StyledTable<UserInfoProps> columns={columns} data={filteredUsers} rowKey="OASId" />
            </Form> 
        </Container>
    );
}

export default UserManagementTable;