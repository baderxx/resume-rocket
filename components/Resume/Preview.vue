<script lang="ts" setup>
  import {ResumeA4Size} from "~/types/enums";

  const resumePreview: Ref<HTMLCanvasElement | null> = ref(null)
  const canvasTemplate: any = {
      canvas: {
        width: ResumeA4Size.width,
        height: ResumeA4Size.height,
        backgroundColor: 'white',
      },
      elements: [
        {
          "type": "text",
          textAlignX: "center",
          "x": 50,
          "y": 50,
          "content": "Badar Usman",
          "style": {
            "fontFamily": "Arial",
            "fontSize": "28px",
            "color": "#333"
          }
        },
        {
          "type": "text",
          textAlignX: "center",
          "x": 50,
          "y": 80,
          "content": "Senior software engineer",
          "style": {
            "fontFamily": "Arial",
            "fontSize": "12px",
            "color": "#333"
          }
        },
      ]
  }

  const renderText = (ctx: CanvasRenderingContext2D, textElement: any) => {
    ctx.font = `${textElement.style.fontSize} ${textElement.style.fontFamily}`
    ctx.fillStyle = textElement.style.color

    if(textElement.textAlignX) {
      ctx.textAlign = "center";
      const centerX = canvasTemplate.canvas.width / 2
      ctx.fillText(textElement.content as string, centerX, textElement.y)
    } else {
      ctx.fillText(textElement.content as string, textElement.x, textElement.y)
    }
  }

    const drawResume = () => {
      const canvas = resumePreview.value
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.canvas.width = canvasTemplate.canvas.width
      ctx.canvas.height = canvasTemplate.canvas.height
      ctx.fillStyle = canvasTemplate.canvas.backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const element of canvasTemplate.elements) {
        switch (element.type) {
          case 'text':
            renderText(ctx, element);
            break;
          // case 'image':
          //   renderImage(ctx, element);
          //   break;
          // case 'shape':
          //   renderShape(ctx, element);
          //   break;
        }
      }
    }

  onMounted(() => {
    if (resumePreview.value) {
      drawResume()
    }
  })
</script>
<template>
  <v-row class="bg-blue-grey-darken-1 px-5 w-full">
    <v-col>
      <canvas
        ref="resumePreview"
        class="my-5 rounded-lg"
        :width="ResumeA4Size.width" 
        :height="ResumeA4Size.height"
      />
    </v-col>
  </v-row>
</template>