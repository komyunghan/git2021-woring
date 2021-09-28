package com.git.myworkspace.contact;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.git.myworkspace.lib.TextProcesser;

@RestController
public class ContactController {

	private ContactRepository repo;

	// Autowired ������̼��� �Ű������� �ʵ� Ÿ�Կ� �´� ��ü��
	// Spring���� �����Ͽ� �����Ͽ���(������ ����, ������ü����, DI, Dependency Injection)
	// Repository �������̽� ������ �´� ��ü�� Spring�� �����Ͽ� �־���
	@Autowired
	public ContactController(ContactRepository repo) {
		this.repo = repo;
	}

	@GetMapping(value = "/contacts")
	public List<Contact> getContacts() throws InterruptedException {
		// repository.findAll();
		// SELECT * FROM contact;
		// �⺻������ PK ������(asc, ascending)�ǰ� �ִ� ��Ȳ
		// 1 2 3 .....
//		return repo.findAll();

		// id�÷� ������(clusted index)
		// Sort.by("�����÷�").desceding() ������
		// Sort.by("�����÷�").ascending() ������
		return repo.findAll(Sort.by("id").descending());
	}

	// ��) �������� 2��, 1��° ������
	// ��) GET /contacts/paging?page=0&size=2
	@GetMapping("/contacts/paging")
	public Page<Contact> getContactsPaging(@RequestParam int page, @RequestParam int size) {
		// findAll(Pageable page)
		// findAll(PageRequest.of(page, size, Sort sort));
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}

	@PostMapping(value = "/contacts")
	public Contact addContact(@RequestBody Contact contact, HttpServletResponse res) throws InterruptedException {
		// �̸�
		if (TextProcesser.isEmpyText(contact.getName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// ��ȭ��ȣ
		if (TextProcesser.isEmpyText(contact.getPhone())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// �̸���
		if (TextProcesser.isEmpyText(contact.getEmail())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// �޸�
		if (TextProcesser.isEmpyText(contact.getDescription())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// ��ü ����
		Contact contactItem = Contact.builder().name(contact.getName()).phone(contact.getPhone()).email(contact.getEmail()).description(TextProcesser.getPlainText(contact.getDescription()))
				.createdTime(new Date().getTime()).build();

		// repository.save(entity)
		// insert into contact(...) values(...)
		Contact contactSaved = repo.save(contactItem);

		// ���ҽ� ������
		res.setStatus(HttpServletResponse.SC_CREATED);

		// �߰��� ��ü�� ��ȯ
		return contactSaved;
	}

	@DeleteMapping(value = "/contacts/{id}")
	public boolean removeContacts(@PathVariable long id, HttpServletResponse res) throws InterruptedException {
//		Thread.sleep(5000);

		// id�� �ش��ϴ� ��ü�� ������
		// Optional null-safe, �ڹ� 1.8 ���� ���
		// repository.findBy(id)
		// select * from contact where id = ?;
		Optional<Contact> contact = repo.findById(id);
		if (contact.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// ���� ����
		// repository.deletebyId(id)
		// delete from contact where id = ?
		repo.deleteById(id);

		return true;
	}

	@PutMapping(value = "/contacts/{id}")
	public Contact modifycontacts(@PathVariable long id, @RequestBody Contact contact, HttpServletResponse res)
			throws InterruptedException {

		// id�� �ش��ϴ� ��ü�� ������
		Optional<Contact> contactItem = repo.findById(id);
		if (contactItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		// �̸��� ��
		if (TextProcesser.isEmpyText(contact.getName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// ��ȭ��ȣ�� ��
		if (TextProcesser.isEmpyText(contact.getPhone())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// ������ ��
		if (TextProcesser.isEmpyText(contact.getEmail())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}


		Contact contactToSave = contactItem.get();

		contactToSave.setName(contact.getName());
		contactToSave.setPhone(contact.getPhone());
		contactToSave.setEmail(contact.getEmail());
		contactToSave.setDescription(contact.getDescription());


		// repository.save(entity)
		// id�� ������ UPDATE, ������ INSERT
		// UPDATE
		// SET title=?, descript=?,......
		// WHERE id = ?
		Contact contactSaved = repo.save(contactToSave);

		return contactSaved;
	}
}