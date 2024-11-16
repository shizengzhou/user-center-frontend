import { deleteUser, searchUsers } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Image, message } from 'antd';
import { useRef } from 'react';

const handleRemove = async (id: number) => {
  const hide = message.loading('正在删除');
  if (!id) return true;
  try {
    await deleteUser({ id });
    hide();
    message.success('删除成功');
    return true;
  } catch (error: any) {
    hide();
    message.error(`删除失败，${error.message}`);
    return false;
  }
};

const UserMange: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.User>[] = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      copyable: true,
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      copyable: true,
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      render: (_, record) => <Image src={record.avatarUrl} width={100} />,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'select',
      valueEnum: {
        0: { text: '女' },
        1: { text: '男' },
      },
    },
    {
      title: '电话',
      dataIndex: 'phone',
      copyable: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      copyable: true,
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
    },
    {
      title: '星球编号',
      dataIndex: 'planetCode',
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      valueType: 'select',
      valueEnum: {
        0: { text: '普通用户' },
        1: { text: '管理员' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (text, record, _, action) => [
        <Button
          type="text"
          danger
          key="delete"
          onClick={async () => {
            const success = await handleRemove(record.id);
            if (success) {
              actionRef.current?.reload();
            }
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.User>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        request={async (params = {}, sort, filter) => {
          const userList = await searchUsers();
          return {
            data: userList.data,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        columns={columns}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
      />
    </PageContainer>
  );
};

export default UserMange;
