class AccordionPage{

    setData(data){
        this.data = data;
    }
    setTargetId(targetId){
        this.targetId = targetId;
    }
    setTitle(title){
        this.title = title;
    }
    
    init() {
      if (this.data == undefined || this.data == null || this.data == []) {
        throw new Error(
          `
          Sayfada gösterilecek bir data bulunamadı.
          Göstermek istediğiniz datayı <setData(data)> fonksiyonunu kullanarak set etmelisiniz.
          Data yapısı aşağıdaki gibi olmalıdır.
        
          const example = [
            {
              title: "string (required)",
              contents: [
                { text: "string (required)", pdf: "url_string (optional)", video: "url_string (optional)" },
                ...
              ]
            },
            ...
          ];
          `
        );
      }

      const parent = this.targetId != undefined && this.targetId != null && this.targetId != "" ? document.querySelector(`#${this.targetId}`) : document.querySelector("body");
  
      const helpPage = document.createElement("div");
      helpPage.classList.add("container");
      helpPage.setAttribute("id", "helpPage");
      helpPage.style = "height: 100% !important; display: flex; justify-content: center; align-items: center; flex-direction: column;";
  
      if (this.title != undefined && this.title != null && this.title != "") {
        const header = document.createElement("div");
        header.classList.add("page-header");
        header.classList.add("m-2");
        header.setAttribute("id", "page-header");
        header.style =
          "color: #0c63e4; background-color: #e7f1ff; text-align: center; width: 100% !important; border-bottom-left-radius: 0.25rem !important; border-top-left-radius: 0.25rem !important; padding: 1rem 1.25rem !important;";
  
        const h1 = document.createElement("h1");
        h1.textContent = this.title;
        h1.style = "font-size: 1.5rem !important;";
  
        header.appendChild(h1);
        helpPage.appendChild(header);
      }
  
      const accordionContainer = document.createElement("div");
      accordionContainer.classList.add("accordion");
      accordionContainer.classList.add("w-100");
      data.forEach((item, index) => {
        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");
  
        const accordionHeader = document.createElement("h2");
        accordionHeader.classList.add("accordion-header");
        accordionHeader.setAttribute("id", `heading${index}`);
  
        const button = document.createElement("button");
        button.classList.add("accordion-button");
  
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-toggle", "collapse");
        button.setAttribute("data-bs-target", `#collapse${index}`);
  
        button.setAttribute("aria-controls", `collapse${index}`);
        button.textContent = item.title;
  
        accordionHeader.appendChild(button);
  
        const accordionCollapse = document.createElement("div");
        accordionCollapse.classList.add("accordion-collapse", "collapse");
        accordionCollapse.setAttribute("id", `collapse${index}`);
        accordionCollapse.setAttribute("aria-labelledby", `heading${index}`);
  
        button.classList.add("collapsed");
        button.setAttribute("aria-expanded", "false");
  
        const accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");
  
        item.contents.forEach((content) => {
          if (content.text && content.text != "") {
            const text = document.createElement("div");
            text.innerText = content.text;
            text.classList.add("mb-3");
            accordionBody.appendChild(text);
          }
          const row = document.createElement("div");
          row.classList.add("row");
          row.classList.add("mb-3");
  
          if (content.pdf && content.pdf != "") {
            const col = document.createElement("div");
            col.classList.add("col-md-6");
            const pdf = document.createElement("div");
            pdf.innerHTML = `<iframe src="${content.pdf}" width="100%" height="315" frameborder="0"></iframe>`;
            col.appendChild(pdf);
            row.appendChild(col);
          }
  
          if (content.video && content.video != "") {
            const col = document.createElement("div");
            col.classList.add("col-md-6");
            const video = document.createElement("div");
            video.innerHTML += `<iframe  width="100%" height="315" src="${content.video}" frameborder="0" allowfullscreen></iframe><br><br>`;
            col.appendChild(video);
            row.appendChild(col);
          }
          accordionBody.appendChild(row);
        });
        accordionCollapse.appendChild(accordionBody);
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(accordionCollapse);
        accordionContainer.appendChild(accordionItem);
      });
  
      helpPage.appendChild(accordionContainer);
      parent.appendChild(helpPage);
    }
};
