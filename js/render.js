// 데이터 로드 → UI 렌더링 메인 함수
async function loadProducts() {
  try {
    // products.json 불러오기
    const response = await fetch("./db/data/products.json");
    const products = await response.json();

    // 렌더링 함수 호출
    renderProducts(products);

    // 검색 기능 연결
    setupSearch(products);

  } catch (error) {
    console.error("상품 데이터를 불러오는 중 오류 발생:", error);
  }
}


// 상품 리스트 렌더링
function renderProducts(products) {
  const listContainer = document.getElementById("productList");
  listContainer.innerHTML = ""; // 기존 내용 초기화

  products.forEach(product => {
    // 상품 카드 wrapper
    const card = document.createElement("div");
    card.className = "product-card";

    // 상품 이미지
    const img = document.createElement("img");
    img.src = `./db/img/item/${product.img}`;
    img.alt = product.display_name;
    img.className = "product-img";
    card.appendChild(img);

    // 상품명
    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = product.display_name;
    card.appendChild(name);

    // 링크 버튼
    const linkBtn = document.createElement("a");
    linkBtn.href = product.link;
    linkBtn.target = "_blank";
    linkBtn.className = "product-link-btn";
    linkBtn.textContent = "상품 보기";
    card.appendChild(linkBtn);

    // 리스트에 삽입
    listContainer.appendChild(card);
  });
}


// 검색 기능
function setupSearch(products) {
  const input = document.getElementById("searchInput");

  input.addEventListener("keyup", () => {
    const query = input.value.toLowerCase();

    // 필터링
    const filtered = products.filter(p =>
      p.display_name.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query)
    );

    // 재렌더링
    renderProducts(filtered);
  });
}


// 페이지 로드 시 실행
loadProducts();
