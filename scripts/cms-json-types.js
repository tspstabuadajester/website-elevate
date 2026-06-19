/**
 * Converts page JSON to CMS typed format ({ type, value }) and back.
 * Types: string, richtext, number, boolean, array, object, link, image, video
 */

const RICHTEXT_KEYS = new Set([
  'body', 'description', 'detail', 'intro', 'paragraph', 'blockquote', 'text',
  'quote', 'answer', 'note', 'footnote', 'detailPlaceholder', 'lead',
  'whatWeDo', 'outcome', 'frequency', 'privacyNote', 'patientsNote', 'summary',
  'detailPlaceholder'
]);

const RICHTEXT_ARRAY_PARENTS = new Set([
  'paragraphs', 'columns', 'addresses', 'bullets'
]);

function isImageShape(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && 'src' in obj && !('poster' in obj);
}

function isVideoShape(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && 'src' in obj && 'poster' in obj;
}

function isLinkShape(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
  const keys = Object.keys(obj);
  return keys.includes('label') && keys.includes('href') && keys.every(function (k) {
    return k === 'label' || k === 'href' || k === 'suffix';
  });
}

function isTypedField(obj) {
  return (
    obj &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    typeof obj.type === 'string' &&
    Object.prototype.hasOwnProperty.call(obj, 'value')
  );
}

const RICHTEXT_SKIP_PARENTS = new Set(['seo', 'site']);

function convertFields(obj, parentKey) {
  const result = {};
  Object.keys(obj).forEach(function (key) {
    result[key] = toTyped(key, obj[key], parentKey);
  });
  return result;
}

function convertObject(obj) {
  return convertFields(obj, '');
}

function convertArrayItem(parentKey, item) {
  if (item === null || item === undefined) {
    return { type: 'string', value: '' };
  }
  if (typeof item === 'string') {
    const useRich =
      RICHTEXT_ARRAY_PARENTS.has(parentKey) ||
      (parentKey === 'items' && item.length > 80);
    return { type: useRich ? 'richtext' : 'string', value: item };
  }
  if (typeof item === 'number') {
    return { type: 'number', value: item };
  }
  if (typeof item === 'boolean') {
    return { type: 'boolean', value: item };
  }
  if (Array.isArray(item)) {
    return { type: 'array', value: item.map(function (child) { return convertArrayItem(parentKey, child); }) };
  }
  if (isImageShape(item)) {
    return { type: 'image', value: convertFields(item) };
  }
  if (isVideoShape(item)) {
    return { type: 'video', value: convertFields(item) };
  }
  if (isLinkShape(item)) {
    return { type: 'link', value: convertFields(item) };
  }
  return { type: 'object', value: convertFields(item, parentKey) };
}

function toTyped(key, val, parentKey) {
  parentKey = parentKey || '';
  if (val === null || val === undefined) {
    return { type: 'string', value: '' };
  }
  if (typeof val === 'boolean') {
    return { type: 'boolean', value: val };
  }
  if (typeof val === 'number') {
    return { type: 'number', value: val };
  }
  if (typeof val === 'string') {
    var isRich = RICHTEXT_KEYS.has(key) && !RICHTEXT_SKIP_PARENTS.has(parentKey);
    return { type: isRich ? 'richtext' : 'string', value: val };
  }
  if (Array.isArray(val)) {
    return {
      type: 'array',
      value: val.map(function (item) { return convertArrayItem(key, item); })
    };
  }
  if (isImageShape(val)) {
    return { type: 'image', value: convertFields(val, key) };
  }
  if (isVideoShape(val)) {
    return { type: 'video', value: convertFields(val, key) };
  }
  if (isLinkShape(val)) {
    return { type: 'link', value: convertFields(val, key) };
  }
  return convertFields(val, key);
}

function toCmsJson(data) {
  return convertObject(data);
}

function unwrapCms(node) {
  if (node == null) return node;

  if (isTypedField(node)) {
    const type = node.type;
    const value = node.value;

    if (type === 'array') {
      return (value || []).map(function (item) { return unwrapCms(item); });
    }

    if (type === 'object' || type === 'link' || type === 'image' || type === 'video') {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return value;
      const result = {};
      Object.keys(value).forEach(function (key) {
        result[key] = unwrapCms(value[key]);
      });
      return result;
    }

    return value;
  }

  if (Array.isArray(node)) {
    return node.map(function (item) { return unwrapCms(item); });
  }

  if (typeof node === 'object') {
    const result = {};
    Object.keys(node).forEach(function (key) {
      result[key] = unwrapCms(node[key]);
    });
    return result;
  }

  return node;
}

module.exports = { toCmsJson, unwrapCms, isTypedField };

if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  const root = path.join(__dirname, '..');
  const files = [
    'index.json', 'about.json', 'services.json', 'contact.json',
    'payment.json', 'service-detail.json', 'blog.json'
  ];

  files.forEach(function (file) {
    const fp = path.join(root, file);
    const raw = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const plain = isTypedField(raw.seo) || (raw.nav && isTypedField(raw.nav.ctaLabel))
      ? unwrapCms(raw)
      : raw;
    const typed = toCmsJson(plain);
    fs.writeFileSync(fp, JSON.stringify(typed, null, 4) + '\n');
    const roundTrip = unwrapCms(typed);
    console.log('converted:', file, 'keys:', Object.keys(roundTrip).join(', '));
  });
}
