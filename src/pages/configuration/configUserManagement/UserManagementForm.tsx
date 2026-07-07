import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHRISUsers } from "../../../hooks/useUser";
import { Loader } from "../../../components/Loader";
import { Drawer, Form, Row, Col, Select, Space, Button, message } from "antd";
import {
  Container,
  SubmitButton,
  StyledFormItem,
  StyledInput,
} from "../../../components/StyledComponents";
import { MailOutlined, SaveOutlined } from "@ant-design/icons";
import { HRISEmployee } from "../../../types/HRISEmployee";
import { DrawerProps } from "../../../types/Drawer";

const UserManagementForm: React.FC<DrawerProps> = ({
  isDrawerOpen,
  closeDrawer,
  onUserAdded,
}) => {
  const { employees, loading: HRISLoading } = useHRISUsers();
  const [selectedEmployee, setSelectedEmployee] = useState<HRISEmployee | null>(
    null
  );
  const [form] = Form.useForm();
  const [ isSubmit, setSubmit ] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    if (isDrawerOpen) {
      if (selectedEmployee) {
        form.setFieldsValue({
          FullName: selectedEmployee.FullName,
          EmployeeId: selectedEmployee.EmployeeId,
          EmailAddress: selectedEmployee.EmailAddress,
          DateHired: selectedEmployee.DateHired,
          Company: selectedEmployee.Company,
          MFAID: getMFAId(selectedEmployee),
        });
      } else {
        form.resetFields();
      }
    }
  }, [isDrawerOpen, selectedEmployee, form]);

  const handleSelect = (value: string) => {
    const employee = employees.find(
      (emp: HRISEmployee) => emp.EmployeeId === value
    );
    setSelectedEmployee(employee);
  };

  const getMFAId = (employee: HRISEmployee): string => {
    const companyCode = employee.Company === "KWE Philippines" ? "01" : "02";
    const dateHired = new Date(employee.DateHired);
    const formattedDate = `${dateHired.getFullYear()}${(
      dateHired.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${dateHired.getDate().toString().padStart(2, "0")}`;
    const employeeId = employee.EmployeeId.slice(1);

    return `X${companyCode}${formattedDate}${employeeId}`;
  };

  const onFinish = async (payload: any) => {
    setSubmit(true);
    try {
      console.log("Submitting", payload);
      const response = await axios.post(`${API_URL}/auth/userCreation`, payload, {
        headers: {
          "Content-Type" : "application/json",
        }, 
      });

      if (response.status){
         message.success("User successfully added!");
         form.resetFields();
         closeDrawer();
         onUserAdded();
      }
      else{
        message.error("Failed to add user!");
      }
    }
    catch(error: any){
      //console.error("Error", error);

      if(error.response?.status === 409){
        message.error(error.response.data.message || "Employee already exists.");
      }else{
        message.error("An unexpected error occured.")
      }
      
    }
    finally{
      setSubmit(false);
    }
  }

  return (
    <Container>
      <Drawer
        title="Add New User"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
        width={1000} // adjust as needed
        extra={
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
            <SubmitButton type="primary" htmlType="submit" loading={isSubmit} onClick={()=> form.submit()}>
              <SaveOutlined /> Submit
            </SubmitButton>
          </Space>
        }
      >
        {HRISLoading && <Loader />}

        <Form form={form} layout="vertical" onFinish={onFinish} >
          <Row gutter={16}>
            <Col span={16}>
              <StyledFormItem
                label={
                  <span style={{ fontWeight: "bold", color: "#1890ff" }}>
                    Select Employee
                  </span>
                }
                rules={[{ required: true, message: "Please select Employee" }]}
              >
                <Select
                  onChange={handleSelect}
                  showSearch
                  optionFilterProp="label"
                  placeholder="Please select Employee Name"
                >
                  {employees?.map((emp: HRISEmployee) => (
                    <Select.Option
                      key={emp.EmployeeId}
                      value={emp.EmployeeId}
                      label={emp.FullName}
                      style={{ fontSize: "13px", fontWeight: "600" }}
                    >
                      {emp.EmployeeId} - {emp.FullName}
                    </Select.Option>
                  ))}
                </Select>
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <StyledFormItem name="FullName" label="Full Name">
                <StyledInput readOnly />
              </StyledFormItem>
            </Col>
            <Col span={12}>
              <StyledFormItem name="EmployeeId" label="Employee ID">
                <StyledInput readOnly />
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <StyledFormItem name="DateHired" label="Date Hired">
                <StyledInput readOnly />
              </StyledFormItem>
            </Col>
            <Col span={12}>
              <StyledFormItem name="Company" label="Company">
                <StyledInput readOnly />
              </StyledFormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <StyledFormItem
                name="EmailAddress"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: "Please input email address",
                  },
                ]}
              >
                <StyledInput addonBefore={<MailOutlined />} />
              </StyledFormItem>
            </Col>
            <Col span={12}>
              <StyledFormItem name="MFAID" label="MFA ID">
                <StyledInput readOnly />
              </StyledFormItem>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </Container>
  );
};

export default UserManagementForm;
