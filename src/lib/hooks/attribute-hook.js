class AttributeHook {
  type = 'AttributeHook'
  constructor (namespace, value) {
    if (!(this instanceof AttributeHook)) {
      return new AttributeHook(namespace, value)
    }
    this.namespace = namespace
    this.value = value
  }

  hook (node, prop, prev) {
    if (prev && prev.type === 'AttributeHook' &&
      prev.value === this.value &&
      prev.namespace === this.namespace) {
      return
    }
    node.setAttributeNS(this.namespace, prop, this.value)
  }

  unhook (node, prop, next) {
    if (next && next.type === 'AttributeHook' &&
      next.namespace === this.namespace) {
      return
    }
    const colonPosition = prop.indexOf(':')
    const localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop
    node.removeAttributeNS(this.namespace, localName)
  }
}

export default AttributeHook
