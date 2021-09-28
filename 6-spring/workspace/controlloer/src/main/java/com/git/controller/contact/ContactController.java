package com.git.controller.contact;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// REST API
// REST ������� ������ �� �ִ� �������̽� �����ϴ� ���α׷�

//@Controller
//@ResponseBody
@RestController
public class ContactController {
	// HashMap ������ �� ��: get(key) -> O(1)
	// ConcurrentSkipListMap Ű �������� ������ �Ǿ�����: get(key) -> O(logn)
	private SortedMap<Long, Contact> contacts = 
			Collections.synchronizedSortedMap(new TreeMap<Long, Contact>(Collections.reverseOrder())) ;
	// id�� ������ ����� ����
	private AtomicLong maxId = new AtomicLong();

	// contact �����ȸ
	// GET /contacts
	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() {
		// �� �����
		return new ArrayList<Contact>(contacts.values());
	}

	// contact 1�� �߰�
	// POST /contacts {"memo":"�׽�Ʈ�Դϴ�"}
	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) {
		// ������ ���� ����
		// �޸��� ������ ����ó����
		if(contact.getName()  == null || contact.getName().isEmpty() 
				&& contact.getPhone()  == null || contact.getPhone().isEmpty() 
				&& contact.getEmail()  == null || contact.getEmail().isEmpty()) {
			// Ŭ���̾�Ʈ���� �޸��� ���� �����ų� ������ ���� ����
			// Ŭ���̾�Ʈ ����, 4xx
			// ��û���� �߸����� ���� - Bad Request (400)
			// res.setStatus(400);
			
			// Dispatcher Servlet�� ������ ���䰴ü�� status�ڵ带 �־���
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// id���� ����
		Long currentId = maxId.incrementAndGet();
		
		// �Է¹��� �����ͷ� contact��ü�� ����
		// id���� �����Ͻô� �������� ������ ������ ó����
		// html�±װ� ������ ��������(script���� ������ �߻���)
		Contact contactItem = Contact.builder()
								.id(currentId)
//								.name(contact.getName().replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", ""))
								.name(contact.getName())
								.phone(contact.getPhone())
								.email(contact.getEmail())
								.createdTime(new Date().getTime())
							.build();
		// contact ��ϰ�ü �߰�
		contacts.put(currentId, contactItem);
		
		// ���ҽ� ������
		// res.setStatus(201);
		res.setStatus(HttpServletResponse.SC_CREATED);
		
		// �߰��� ��ü�� ��ȯ
		return contactItem;
	}
	
	// contact 1�� ����
	// DELETE /contacts/1 -> id�� 1�� �׸��� �����ض�
	// id���� path variable��
	@DeleteMapping(value="/contacts/{id}")
	public boolean removeContact(@PathVariable long id, HttpServletResponse res) {
		
		// �ش� id�� ������ 1���� ������
		Contact contact = contacts.get(Long.valueOf(id));
		// �ش� id�� �����Ͱ� ������
		if(contact == null) {
			// res.setStatus(404);
			// NOT FOUND: �ش� ��ο� ���ҽ��� ����
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}
		
		// ���� ����
		contacts.remove(Long.valueOf(id));
		
		return true;
	}
	
	// contact 1�� ����
	// PUT /contacts/1 {"memo":"..."}
	// id���� path variable�� 
	@PutMapping(value="/contacts/{id}")	
	public Contact modifyContact(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res) {
		// �ش� id�� ������ 1���� ������
		Contact findItem = contacts.get(Long.valueOf(id));
		// �ش� id�� �����Ͱ� ������
		if(findItem == null) {
			// res.setStatus(404);
			// NOT FOUND: �ش� ��ο� ���ҽ��� ����
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}
		
		// ������ ���� ����
		// �޸��� ������ ����ó����
		if(contact.getName()  == null || contact.getName().isEmpty() 
				&& contact.getPhone()  == null || contact.getPhone().isEmpty() 
				&& contact.getEmail()  == null || contact.getEmail().isEmpty()) {
			// Ŭ���̾�Ʈ���� �޸��� ���� �����ų� ������ ���� ����
			// Ŭ���̾�Ʈ ����, 4xx
			// ��û���� �߸����� ���� - Bad Request (400)
			// res.setStatus(400);
			
			// Dispatcher Servlet�� ������ ���䰴ü�� status�ڵ带 �־���
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}		
		
		// ������ ����
		findItem.setName(contact.getName());
		findItem.setPhone(contact.getPhone());
		findItem.setEmail(contact.getEmail());
		return findItem;
	}
	
} 