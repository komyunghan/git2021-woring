package com.git.TeamProject.storelist;

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

import com.git.TeamProject.lib.TextProcesser;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class StoreListController {

	private StoreListRepository repo;

	// Autowired 占쏙옙占쏙옙占쏙옙抉占쏙옙占� 占신곤옙占쏙옙占쏙옙占쏙옙 占십듸옙 타占쌉울옙 占승댐옙 占쏙옙체占쏙옙
	// Spring占쏙옙占쏙옙 占쏙옙占쏙옙占싹울옙 占쏙옙占쏙옙占싹울옙占쏙옙(占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙, 占쏙옙占쏙옙占쏙옙체占쏙옙占쏙옙, DI, Dependency
	// Injection)
	// Repository 占쏙옙占쏙옙占쏙옙占싱쏙옙 占쏙옙占쏙옙占쏙옙 占승댐옙 占쏙옙체占쏙옙 Spring占쏙옙 占쏙옙占쏙옙占싹울옙 占쌍억옙占쏙옙
	@Autowired
	public StoreListController(StoreListRepository repo) {
		this.repo = repo;
	}

	@GetMapping(value = "/storeLists")
	public List<StoreList> getStoreLists() throws InterruptedException {
		// repository.findAll();
		// SELECT * FROM contact;
		// 占썩본占쏙옙占쏙옙占쏙옙 PK 占쏙옙占쏙옙占쏙옙(asc, ascending)占실곤옙 占쌍댐옙 占쏙옙황
		// 1 2 3 .....
//		return repo.findAll();

		// id占시뤄옙 占쏙옙占쏙옙占쏙옙(clusted index)
		// Sort.by("占쏙옙占쏙옙占시뤄옙").desceding() 占쏙옙占쏙옙占쏙옙
		// Sort.by("占쏙옙占쏙옙占시뤄옙").ascending() 占쏙옙占쏙옙占쏙옙
		return repo.findAll(Sort.by("id").descending());
	}

	private List<StoreList> findAll(Sort descending) {
		// TODO Auto-generated method stub
		return null;
	}

	// 占쏙옙) 占쏙옙占쏙옙占쏙옙占쏙옙 2占쏙옙, 1占쏙옙째 占쏙옙占쏙옙占쏙옙
	// 占쏙옙) GET /contacts/paging?page=0&size=2
	@GetMapping("/storeLists/paging")
	public Page<StoreList> getStoreListsPaging(@RequestParam int page, @RequestParam int size) {
		// findAll(Pageable page)
		// findAll(PageRequest.of(page, size, Sort sort));
		return repo.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
	}

	private Page<StoreList> findAll(PageRequest of) {
		// TODO Auto-generated method stub
		return null;
	}

	@PostMapping(value = "/storeLists")
	public StoreList addStoreList(@RequestBody StoreList storeList, HttpServletResponse res)
			throws InterruptedException {
		// 占싱몌옙
		if (TextProcesser.isEmpyText(storeList.getName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 占쏙옙화占쏙옙호
		if (TextProcesser.isEmpyText(storeList.getAddress())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 占싱몌옙占쏙옙
		if (TextProcesser.isEmpyText(storeList.getPhoneNumber())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 占쌨몌옙
		if (TextProcesser.isEmpyText(storeList.getLat())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		if (TextProcesser.isEmpyText(storeList.getLng())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 占쏙옙체 占쏙옙占쏙옙
		StoreList storeListItem = StoreList.builder().name(storeList.getName()).address(storeList.getAddress())
				.phoneNumber(storeList.getPhoneNumber()).lat(storeList.getLat()).lng(storeList.getLng())
				.build();

		// repository.save(entity)
		// insert into contact(...) values(...)
		StoreList storeListSaved = repo.save(storeListItem);

		// 占쏙옙占쌀쏙옙 占쏙옙占쏙옙占쏙옙
		res.setStatus(HttpServletResponse.SC_CREATED);

		// 占쌩곤옙占쏙옙 占쏙옙체占쏙옙 占쏙옙환
		return storeList;
	}

	private StoreList save(StoreList storeListItem) {
		// TODO Auto-generated method stub
		return null;
	}

	@DeleteMapping(value = "/storeLists/{id}")
	public boolean removeStoreLists(@PathVariable long id, HttpServletResponse res) throws InterruptedException {
//		Thread.sleep(5000);

		// id占쏙옙 占쌔댐옙占싹댐옙 占쏙옙체占쏙옙 占쏙옙占쏙옙占쏙옙
		// Optional null-safe, 占쌘뱄옙 1.8 占쏙옙占쏙옙 占쏙옙占�
		// repository.findBy(id)
		// select * from contact where id = ?;
		Optional<StoreList> storeList = repo.findById(id);
		if (storeList.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		// 占쏙옙占쏙옙 占쏙옙占쏙옙
		// repository.deletebyId(id)
		// delete from contact where id = ?
		repo.deleteById(id);

		return true;
	}

	private void deleteById(long id) {
		// TODO Auto-generated method stub

	}

	private Optional<StoreList> findById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@PutMapping(value = "/storeLists/{id}")
	public StoreList modifystoreLists(@PathVariable long id, @RequestBody StoreList storeList, HttpServletResponse res)
			throws InterruptedException {

		// id占쏙옙 占쌔댐옙占싹댐옙 占쏙옙체占쏙옙 占쏙옙占쏙옙占쏙옙
		Optional<StoreList> storeListItem = repo.findById(id);
		if (storeListItem.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		// 占싱몌옙占쏙옙 占쏙옙
		if (TextProcesser.isEmpyText(storeList.getName())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 占쏙옙화占쏙옙호占쏙옙 占쏙옙
		if (TextProcesser.isEmpyText(storeList.getAddress())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 占쏙옙占쏙옙占쏙옙 占쏙옙
		if (TextProcesser.isEmpyText(storeList.getPhoneNumber())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		// 占쏙옙占쏙옙占쏙옙 占쏙옙
		if (TextProcesser.isEmpyText(storeList.getLat())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		// 占쏙옙占쏙옙占쏙옙 占쏙옙
		if (TextProcesser.isEmpyText(storeList.getLng())) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		StoreList storeListToSave = storeListItem.get();

		storeListToSave.setName(storeList.getName());
		storeListToSave.setAddress(storeList.getAddress());
		storeListToSave.setPhoneNumber(storeList.getPhoneNumber());
		storeListToSave.setLat(storeList.getLat());
		storeListToSave.setLng(storeList.getLng());

		// repository.save(entity)
		// id占쏙옙 占쏙옙占쏙옙占쏙옙 UPDATE, 占쏙옙占쏙옙占쏙옙 INSERT
		// UPDATE
		// SET title=?, descript=?,......
		// WHERE id = ?
		StoreList storeListSaved = repo.save(storeListToSave);

		return storeListSaved;
	}
}