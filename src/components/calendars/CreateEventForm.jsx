import React from 'react';
import {Button, Col, DatePicker, Form, Input, Row, Select, TimePicker} from "antd";
const { Item } = Form
const  { Option } = Select


const CreateEventForm = () => {
	const onFinish = () => {
		console.log()
	}
	return (
		<Form
			name="create-event-form"
			onFinish={onFinish}
			autoComplete="off"
			layout="vertical"
			initialValues={{
				duration: '0h 30m'
			}}
		>
			<Item
				label="Title"
				name="title"
				rules={[{ required: true}]}
			>
				<Input placeholder="Event Title" />
			</Item>

			<Item
				label="Target user"
				name="targetUser"
				rules={[{required: true}]}
			>
				<Select placeholder="Target user">
					<Option value="John">John</Option>
					<Option value="Jane">Jane</Option>
					<Option value="Bill">Bill</Option>
				</Select>
			</Item>
			<Item
				label="Date"
				name="date"
				rules={[{required: true}]}
			>
				<DatePicker style={{width: '100%'}}/>
			</Item>
			<Row gutter={16}>
				<Col span={12}>
					<Item
						label="Start time"
						name="startTime"
					>
						<TimePicker use12Hours format='HH:mm' style={{width: '100%'}} minuteStep={30}/>
					</Item>
				</Col>
				<Col span={12}>
					<Item
						label="Duration"
						name="duration"
					>
						<Select>
							<Option value="0h 30m">0h 30m</Option>
							<Option value="1h 00m">1h 00m</Option>
							<Option value="1h 30m">1h 30m</Option>
							<Option value="2h 00m">2h 00m</Option>
							<Option value="2h 30m">2h 30m</Option>
							<Option value="3h 00m">3h 00m</Option>
						</Select>
					</Item>
				</Col>
			</Row>
			<Item
				label="Notes"
				name="notes"
			>
				<Input.TextArea placeholder="Notes" />
			</Item>
			<Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Item>
		</Form>
	);
};

export default CreateEventForm;
