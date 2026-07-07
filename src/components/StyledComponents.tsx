import styled from "styled-components";
import { Input, Button, Form } from "antd";


export const Container = styled.div`
    padding: 16px;
`

export const SearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
`
export const SearchInput = styled(Input)`
    width: 33%;
    font-size: 13px;
`

export const AddButton = styled(Button)`
    width: 10%;
`

export const SubmitButton = styled(Button)`
    width: 100%;
`

export const StyledFormItem = styled(Form.Item)`
    .ant-form-item-label > label {
    font-weight: 300;
    color: #000;
    font-size:13px;
  }
`

export const StyledInput = styled(Input)`
    font-size: 13px;
`