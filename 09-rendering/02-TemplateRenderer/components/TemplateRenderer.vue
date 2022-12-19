<script>
import { compile, h, defineComponent } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    ResultComponent() {
      return defineComponent({
        components: this.components,
        props: {
          bindings: {
            type: Object,
            required: true,
          },
        },
        render: compile(this.template),
      });
    },
  },

  render() {
    return h(this.ResultComponent, { bindings: this.bindings });
  },
};
</script>
