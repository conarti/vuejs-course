export function editContent(type, value, sections) {
  if (canEdit(type, sections)) {
    editSection(type, value, sections)
  } else {
    addSection(type, value, sections)
  }
}

function getEditableSection(sections) {
  const sectionIdx = sections.findIndex(item => !(item.hasOwnProperty('title') && item.hasOwnProperty('text')))
  if (sectionIdx >= 0) {
    return sections[sectionIdx]
  }
}

function canEdit(type, sections) {
  const target = getEditableSection(sections)
  if (target) {
    const property = type === 'subtitle' ? 'title' : 'text'
    return !target.hasOwnProperty(property)
  } else {
    return false
  }
}

function editSection(type, value, sections) {
  const target = getEditableSection(sections)
  switch(type) {
    case 'subtitle':
      target.title = value
      break
    case 'text':
      target.text = value
      break
  }
}

function addSection(type, value, sections) {
  const newSection = {}
  switch (type) {
    case 'subtitle':
      newSection.title = value
      break
    case 'text':
      newSection.text = value
      break
  }
  newSection.id = generateID()
  sections.push(newSection)
}

function generateID() {
  return Math.random().toString(36).substr(2, 9)
}
