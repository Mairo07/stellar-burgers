beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'ingredients'
  );
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
  cy.setCookie('accessToken', 'mockAccessToken');
  localStorage.setItem('refreshToken', 'mockrRefreshToken');
  cy.visit('http://localhost:4000');
  cy.wait(['@ingredients', '@user']);
});

afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

describe('Конструктор бургера', () => {
  it('Добавляется булка', () => {
    cy.get('[data-cy="burger-constructor"]').should(
      'not.contain.text',
      'Краторная булка N-200i'
    );

    const button = cy
      .get('li')
      .contains('Краторная булка N-200i')
      .parent()
      .find('button');

    button.click();

    cy.get('[data-cy="burger-constructor"]').should(
      'contain.text',
      'Краторная булка N-200i'
    );
  });

  it('Добавляетя начинка', () => {
    cy.get('[data-cy="burger-constructor"]').should(
      'not.contain.text',
      'Говяжий метеорит (отбивная)'
    );

    const button = cy
      .get('li')
      .contains('Говяжий метеорит (отбивная)')
      .parent()
      .find('button');

    button.click();

    cy.get('[data-cy="burger-constructor"]').should(
      'contain.text',
      'Говяжий метеорит (отбивная)'
    );
  });
});

describe('Модальное окно', () => {
  it('Открывается модальное окно ингредиента', () => {
    const modal = cy.get('#modals');

    modal.should('be.empty');

    const anchor = cy.get('li').contains('Краторная булка N-200i');
    anchor.click();

    modal.should('not.be.empty');
    modal.should('contain.text', 'Краторная булка N-200i');
  });

  describe('закрытие модального окна', () => {
    beforeEach(() => {
      const anchor = cy.get('li').contains('Краторная булка N-200i');
      anchor.click();
    });

    it('закрывается по клику на крестик', () => {
      const modal = cy.get('#modals');
      modal.should('not.be.empty');

      const button = modal.find('button');
      button.click();

      modal.should('not.exist');
      cy.get('#modals').should('be.empty');
    });

    it('закрывается по клику на оверлей', () => {
      const modal = cy.get('#modals');
      modal.should('not.be.empty');

      const overlay = modal.children().last();
      overlay.click('top', { force: true });

      modal.should('not.exist');
      cy.get('#modals').should('be.empty');
    });
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    cy.get('[data-cy="profile"]').should('contain.text', 'test');
    cy.get('li')
      .contains('Флюоресцентная булка R2-D3')
      .parent()
      .find('button')
      .click();

    cy.get('li')
      .contains('Соус фирменный Space Sauce')
      .parent()
      .find('button')
      .click();

    cy.get('li')
      .contains('Говяжий метеорит (отбивная)')
      .parent()
      .find('button')
      .click();
  });

  it('Собирается бургер', () => {
    const burgerConstructor = cy.get('[data-cy="burger-constructor"]');
    burgerConstructor.should('contain.text', 'Флюоресцентная булка R2-D3');
    burgerConstructor.should('contain.text', 'Соус фирменный Space Sauce');
    burgerConstructor.should('contain.text', 'Говяжий метеорит (отбивная)');

    burgerConstructor.should('not.contain.text', 'Выберите булки');
    burgerConstructor.should('not.contain.text', 'Выберите начинку');
  });

  it('При клике на кнопку "Оформить заказ" вызывается модальное окно с верным номером заказа', () => {
    const modal = cy.get('#modals');
    modal.should('be.empty');

    cy.get('[data-cy="burger-constructor"]').contains('Оформить заказ').click();
    cy.wait('@order');

    modal.should('not.be.empty');
    modal.should('contain.text', '64935');
  });

  it('Закрывается модальное окно. После закрытия окна конструктор бургера пуст.', () => {
    cy.get('[data-cy="burger-constructor"]').contains('Оформить заказ').click();
    cy.wait('@order');
    const modal = cy.get('#modals');
    modal.should('not.be.empty');

    const button = modal.find('button');
    button.click();

    modal.should('not.exist');
    cy.get('#modals').should('be.empty');

    const burgerConstructor = cy.get('[data-cy="burger-constructor"]');
    burgerConstructor.should('contain.text', 'Выберите булки');
    burgerConstructor.should('contain.text', 'Выберите начинку');
  });
});
