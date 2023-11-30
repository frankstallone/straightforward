// variables
const accordionItems = [...document.querySelectorAll('.accordion__item')];

// functions
const getPanelHeight = (accordionItem) => {
  const accordionInner = accordionItem.querySelector('.panel__inner');
  return accordionInner.getBoundingClientRect().height;
};

const openAccordionItem = (accordionItem) => {
  const accordionItemHeader = accordionItem.querySelector('.accordion__header');
  const accordionToggleIndicator = accordionItem.querySelector(
    '.header__toggle-indicator',
  );
  const accordionPanel = accordionItem.querySelector('.accordion__panel');

  accordionPanel.style.height = `${getPanelHeight(accordionItem)}px`;
  accordionItem.classList.add('is-active');
  accordionItemHeader.setAttribute('aria-expanded', true);
  accordionToggleIndicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="header__toggle-indicator" aria-hidden="true" viewBox="0 0 512 512"><path d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"/></svg>`;
};

const closeAccordionItem = (accordionItem) => {
  const accordionItemHeader = accordionItem.querySelector('.accordion__header');
  const accordionToggleIndicator = accordionItem.querySelector(
    '.header__toggle-indicator',
  );
  const accordionPanel = accordionItem.querySelector('.accordion__panel');

  accordionItem.classList.remove('is-active');
  accordionPanel.style.height = 0;
  accordionItemHeader.focus();
  accordionItemHeader.setAttribute('aria-expanded', false);
  accordionToggleIndicator.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="header__toggle-indicator" aria-hidden="true" viewBox="0 0 512 512"><path d="M239 111c9.4-9.4 24.6-9.4 33.9 0L465 303c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-175-175L81 337c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 111z"></path></svg>`;
};

const isAccordionOpen = (accordionItem) => {
  return accordionItem.classList.contains('is-active');
};

function toggleAccordionItem() {
  const accordionItem = event.target.closest('.accordion__item');
  if (!accordionItem || event.target.closest('.accordion__panel')) return;

  isAccordionOpen(accordionItem)
    ? closeAccordionItem(accordionItem)
    : openAccordionItem(accordionItem);
}

function recalculateHeight() {
  const toggledAccordionItems = accordionItems.filter((element) =>
    element.classList.contains('is-active'),
  );

  toggledAccordionItems.forEach((toggledAccordionItem) => {
    const accordionPanel =
      toggledAccordionItem.querySelector('.accordion__panel');
    accordionPanel.style.height = `${getPanelHeight(toggledAccordionItem)}px`;
  });
}

// execution
accordionItems.forEach((item, index) => {
  const accordionItemHeader = item.querySelector('.accordion__header');
  const accordionItemPanel = item.querySelector('.accordion__panel');

  accordionItemHeader.setAttribute('id', `accordion-item${index + 1}`);
  accordionItemPanel.setAttribute('id', `item${index + 1}`);

  accordionItemHeader.setAttribute('aria-controls', `item${index + 1}`);
  accordionItemPanel.setAttribute(
    'aria-labelledby',
    `accordion-item${index + 1}`,
  );
});

document.addEventListener('keydown', (event) => {
  const accordionItem = event.target.closest('.accordion__item');

  if (event.key !== 'Escape') return;
  if (!accordionItem) return;

  if (isAccordionOpen(accordionItem)) {
    closeAccordionItem(accordionItem);
  }
});

document.addEventListener('keydown', (event) => {
  if (!event.target.closest('.accordion__header')) return;

  const accordionWrapper = event.target.closest('.accordion__wrapper');
  const accordionItem = event.target.closest('.accordion__item');
  const accordionItems = [
    ...accordionWrapper.querySelectorAll('.accordion__item'),
  ];
  const index = accordionItems.findIndex(
    (element) => element === accordionItem,
  );

  const { key } = event;

  let targetItem;

  if (key === 'ArrowDown') {
    targetItem = accordionItems[index + 1];
  }

  if (key === 'ArrowUp') {
    targetItem = accordionItems[index - 1];
  }

  if (targetItem) {
    event.preventDefault();
    targetItem.querySelector('.accordion__header').focus();
  }
});

window.toggleAccordionItem = toggleAccordionItem;
window.onresize = recalculateHeight;
