package com.git.controller;

// ���� �������� ���ϴ� static �޼���
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import  org.springframework.mock.web.MockHttpServletResponse;

import com.git.controller.contact.Contact;
import com.git.controller.contact.ContactController;

//unit test
//- �ڹ� �������� ���� �� Ŭ������ �޼������ �׽�Ʈ�ϴ� ��
//
//integration test
//- �鿣��������� ���� ���� API�� �׽�Ʈ�ϴ� ��
//- ������ ����, ��Ʈ��ũ�� �����͸� ������ ó�� ������� Ȯ��

@SpringBootTest
public class TestContactController {
		
	// test case: �� �� �߰�
	// event flow(ó���帧): �� �� 1���� �߰���
	// pre-condition(��������): ���� ����..
	// expected result(������): �� �� ��Ͽ� �߰��� �����Ͱ� �����ؾ���
	@Test
	void addContact() {
		// given - �׽�Ʈ ������ �� ��ü �غ�
		ContactController controller = new ContactController();
		Contact expected = Contact.builder().name("test").build();
		
		// when - �׽�Ʈ ���̽��� event flow�� ����
		// ServletResponse ��ü�� ��¥(Mock)�� �־���
		controller.addContact(expected, new MockHttpServletResponse());
		
		// then - �������� ��������� ��
		
		// ��ü ��Ͽ� �߰��Ѿָ� ������
		List<Contact> contacts =  controller.getContacts();
		Contact actual = contacts.get(0);	// arrayList.get(�ε���);
		
		// ������ �����Ϳ� ���� �����͸� ����
		assertEquals(1, actual.getId());
		assertEquals(expected.getName(), actual.getName());
	}
	
	// test case: �� �� ����
	// event flow(ó���帧): �� �� 1���� ������
	// pre-condition(��������): �� �� ������ �ּ� 1�� �̻� �־����
	// expected result(������): �� �� ��Ͽ� ������ �����Ͱ� �����ϸ� �� ��	
	@Test
	void removeContact() {
		// given - �׽�Ʈ ������ �� ��ü �غ�
		// ���������� �ִٸ� ���������� �غ��ϴ� �ܰ�
		// ���⼭�� 1�� �߰��� �Ǿ��־����
		ContactController controller = new ContactController();
		
		Contact testItem = Contact.builder().name("test").build();
		
		controller.addContact(testItem, new MockHttpServletResponse());
		
		List<Contact> beforeContacts = controller.getContacts();
		assertEquals(1, beforeContacts.size());	// ���� ������ ��� ũ�Ⱑ 1
		
		// when - �׽�Ʈ ���̽��� event flow�� ����
		// id�� 1�� contact 1���� ����
		controller.removeContact(1, new MockHttpServletResponse());	
		
		// then - �������� ��������� ��
		// ����� ��ȸ���� �� ����� ũ�Ⱑ 0�̿���
		List<Contact> afterContacts = controller.getContacts();
		assertEquals(0, afterContacts.size());		// ���� �Ŀ��� ��� ũ�Ⱑ 0
	}

	// test case: �� �� ����
	// event flow(ó���帧): 
	//   basic flow(�����帧):
	//     1. �� �� 1�ǿ� ���ؼ� �޸��� ������
	//   alternative flow(�����帧): 
	//     1. ��Ͽ� ���� id������ ������ ���� - 404
	//	   2. �޸��� �� �� �Ǵ� ������ ��ü�� �Ⱥ����� - 400 
	// pre-condition(��������): �� �� ������ �ּ� 1�� �̻� �־����
	// expected result(������): �� �� ��Ͽ� ������ �޸����� ��µǾ����		
	@Test
	void modifyContact() {
		// given - �׽�Ʈ ������ �� ��ü �غ�
		// ���������� �ִٸ� ���������� �غ��ϴ� �ܰ�
		// ���⼭�� 1�� �߰��� �Ǿ��־����		
		ContactController controller = new ContactController();
		
		Contact testItem = Contact.builder().name("test").build();
		controller.addContact(testItem, new MockHttpServletResponse());		
		
		// ������ �׽�Ʈ ������
		String expectedResult = "modify test name";
		Contact modifyData = Contact.builder().name(expectedResult).build();
		
		HttpServletResponse res = new MockHttpServletResponse();
		
		// basic flow - �������� ��Ȳ
		// when - �׽�Ʈ ���̽��� event flow�� ����
		// id�� 1�� contact�� memo�� ����
		controller.modifyContact(1, modifyData, res);
		
		// then - �������� ��������� ��
		// ����� ��ȸ���� �� �ش� �������� �޸��� �������� ��ġ�ؾ���
		List<Contact> contacts = controller.getContacts();
		assertEquals(expectedResult, contacts.get(0).getName());	
		
		// altanative flow - 1. id���� ���� ���
		// when - id�� 2�� �����غ�
		Contact resultContactId = controller.modifyContact(2, modifyData, res);
		
		// then - �������� ��������� ��
		// ��ȯ ��ü�� null, Status Code 404
		assertNull(resultContactId); 
		assertEquals(HttpServletResponse.SC_NOT_FOUND, res.getStatus());
		
		// altanative flow - 2-1. memo���� null�ΰ��
		// when
		Contact resultContactMemoNull = controller.modifyContact(1, new Contact(), res);
		
		// then - �������� ��������� ��
		// ��ȯ ��ü�� null, Status Code 400
		assertNull(resultContactMemoNull); 
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());

		// altanative flow - 2-2. memo���� �� ��("")�ΰ��
		// when
		Contact resultContactMemoEmpty = controller.modifyContact(1, Contact.builder().name("").build(), res);
		
		// then - �������� ��������� ��
		// ��ȯ ��ü�� null, Status Code 400		
		assertNull(resultContactMemoEmpty); 
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, res.getStatus());		
	}
}