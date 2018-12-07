const ejs = require('ejs');

const template = `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Информационная Система Электронных Счетов-Фактур</title>
    <style type="text/css">
      /*reset*/
      body,
      div,
      dl,
      dt,
      dd,
      ul,
      ol,
      li,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      pre,
      form,
      fieldset,
      input,
      textarea,
      p,
      blockquote,
      th,
      td {
        margin: 0;
        padding: 0;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        width:100%;
        height: 100%;
      }

      .print-page table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
      }

      .print-page ul {
        list-style-type: none;
      }

      body.print-bg {
        font: 13px/120% Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
        position: relative;
      }

      .printer {
        margin-right: 5px;
      }

      /*clearfix*/
      .clearfix:after {
        content: ".";
        display: block;
        clear: both;
        visibility: hidden;
        line-height: 0;
        height: 0;
      }

      .clearfix {
        display: block;
      }

      html[xmlns] .clearfix {
        display: block;
      }

      * html .clearfix {
        height: 1%;
      }

      .print-page {
        width: 960px;
        margin:0 auto;
        position: relative;
        padding: 10px;
      }

      .print-page h3 {
        font-size: 16px;
        font-weight: bold;
        padding: 5px 0;
      }

      .print-page .sub_title {
        font-size: 1.3em;
        font-style: italic;
        margin-bottom: 10px;
        text-decoration: underline;
      }

      .print-page .bold {
        font-weight:bold;
      }

      .print-page .fl {
        float:left;
      }

      .print-page .sectionContainer h3 {}

      .print-page .sectionContainer table {
        border-collapse: collapse;
      }

      .print-page .sectionContainer table td {
        border: 1px solid #000;
        padding:2px 10px 2px 10px;
        vertical-align: top;
      }

      .print-page .sectionContainer table th {
        border:1px solid #000;
        vertical-align: top;
      }

      .print-page .sectionContainer table td b {
        padding-right:10px;
      }

      .print-page .field-name {
        padding-right:20px;
      }

      .print-page .field-value {font-size: 16px;}

      .print-page .field-value:not(.img-holder) {
        text-decoration: underline;
      }

      .print-page ul.select {
        border-top:1px solid #000;
        margin-top: 2px;
        padding :2px 0;
      }

      .print-page .galka {
        padding-left:10px;
      }

      .print-page .num-cell {
        text-align: center;
      }

      .print-page .ServiceTable td {
        text-align: center;
      }

      .print-page .totalRow td {
        font-weight: bold;
      }

      .print-page .last-section {
        width:60%;
        margin:30px 0 30px 40%;
      }

      .print-page .last-section  td {
        width:50%;
        margin:30px 0 30px 60%;
        padding:0 10px
      }

      .print-page .sectionContainer .j-table td {
        border:none;
        padding:0;
      }

      .print-page .sectionContainer .j-table td p {
        width:300px;
        word-wrap: break-word;
      }

      .print-page .sectionContainer:after {
        display: none;
      }

      .print-page input {
        vertical-align: middle;
        margin-right: 5px;
      }

      .print-page .status_letter {
        float: left;
        margin-right: 5px;
        border: solid 1px;
        width: 16px;
        height: 16px;
        text-align: center;
      }

      .print-page .select li {
        height: 20px;
      }

      .sector_title_big {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 15px;
      }

      .print-page .sectionContainer > div {
        border: 1px solid #000000;
        border-top: none;
      }

      .print-page .sectionContainer > h3 {
        border: 2px solid #000000;
        border-top: none;
        border-bottom: none;
        text-align: center;
      }

      .print-page .sectionContainer.first_section > h3 {
        border-top: 2px solid #000000;;
      }

      .print-page .seller_count {
        position: absolute;
        margin-top: -55px;
        right: 0;
      }

      .print-page .customer_count {
        position: absolute;
        margin-top: -100px;
        right: 0;
      }

      .print-page .seller_count .field-value, .print-page .customer_count .field-value {
        display: block;
      }

      .print-page .no_border_table {
        border: 0;
      }

      .print-page .sectionContainer .no_border_table td {
        border: 0;
        padding: 0;
      }

      .print-page .service_grid td > span,

      .print-page .totalRow td > span {
        display: block;
        word-wrap: break-word;
      }

      .print-page .totalRow td {
        word-wrap: break-word;
      }

      .print-page .ServiceTable th {
        word-break: break-all;
      }

      .print-page .service_grid td,

      .print-page .totalRow td {
        max-width: 40px;
      }

      .print-page .sectionContainer table.ServiceTable td {
        padding: 2px;
      }

      .display_none {
        display: none !important;
      }
    </style>
  </head>
  <body class="print-bg">
    <div class="print-page">
      <div class="sector_title_big">СЧЕТ-ФАКТУРА</div>
      <!-- Section A -->
      <div class="sectionContainer first_section">
        <h3>Раздел А. Общий раздел</h3>
        <div>
          <table border="0">
            <tbody>
            <tr>
              <td>
                <b>1.</b>
                <span class="field-name bold">Регистрационный номер</span>
                <span class="field-value"><%=registrationNumber%></span>
              </td>
              <td>
                <b>1.1.</b><span class="field-name bold">Номер учетной системы</span><span class="field-value"><%=invoice.num%></span>
              </td>
            </tr>
            <tr>
              <td style="width:50%;">
                <b>2.</b><span class="field-name bold">Дата выписки</span>
                <span class="field-value"><%=invoice.date%></span>
              </td>
              <td>
                <b>3.</b><span class="field-name bold">Дата совершения оборота</span>
                <span class="field-value"><%=invoice.turnoverDate%></span>
              </td>
            </tr>
            <tr>
              <td>
                <!-- исправленный -->
                <table class="no_border_table">
                  <tbody>
                  <tr>
                    <td class="first_td">
                      <b>4.</b><span class="field-name">Исправленный</span>
                      <span class="field-value"><%-invoice.invoiceType === "FIXED_INVOICE"? '&#x2713;' : ''%></span>
                    </td>
                    <td>
                      <b>4.1</b><span class="field-name">Дата</span>
                      <span class="field-value"><%=invoice.invoiceType === "FIXED_INVOICE" ? invoice.relatedInvoice.date : ''%></span>
                    </td>
                  </tr>
                  <tr>
                    <td class="first_td">
                      <b>4.2</b><span class="field-name">Номер</span>
                      <span class="field-value"><%=invoice.invoiceType === "FIXED_INVOICE" ? invoice.relatedInvoice.num : ''%></span>
                    </td>
                    <td>
                      <b>4.3</b><span class="field-name">Регистрационный номер</span>
                      <span class="field-value"><%=invoice.invoiceType === "FIXED_INVOICE" ? invoice.relatedInvoice.registrationNumber : ''%></span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <!-- допольнительный -->
                <table class="no_border_table">
                  <tbody>
                  <tr>
                    <td class="first_td">
                      <b>5.</b><span class="field-name">Дополнительный</span>
                      <span class="field-value"><%-invoice.invoiceType === "ADDITIONAL_INVOICE" ? '&#x2713;' : ''%></span>
                      </span>
                    </td>
                    <td>
                      <b>5.1</b><span class="field-name">Дата</span>
                      <span class="field-value"><%=invoice.invoiceType === "ADDITIONAL_INVOICE" ? invoice.relatedInvoice.date : ''%></span>
                    </td>
                  </tr>
                  <tr>
                    <td class="first_td">
                      <b>5.2</b><span class="field-name">Номер</span>
                      <span class="field-value"><%=invoice.invoiceType === "ADDITIONAL_INVOICE" ? invoice.relatedInvoice.num : ''%></span>
                    </td>
                    <td>
                      <b>5.3</b><span class="field-name">Регистрационный номер</span>
                      <span class="field-value"><%=invoice.invoiceType === "ADDITIONAL_INVOICE" ? invoice.relatedInvoice.registrationNumber : ''%></span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Section B -->
      <div class="sectionContainer">
        <h3>Раздел B. Реквизиты поставщика</h3>
        <div>
          <table class="container" border="0">
            <tbody>
            <tr>
              <td style="width:55%;">
                <table class="no_border_table">
                  <tbody>
                  <tr>
                    <td class="first_td">
                      <b>6.</b><span class="field-name">ИИН/БИН</span><span class="field-value"><%=invoice.sellers.seller[0].tin || ''%></span>
                    </td>
                    <td>
                      <b>6.1</b><span class="field-name">РНН реорганизованного лица</span><span class="field-value"></span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
              <td rowspan="4">
                <b>10.</b><span class="field-name">Категория поставщика</span>
                <ul class="select">
                  <!--<li>Комитент</li>-->
                  <li class="clearfix"><div class="status_letter">A</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Комитент</label></li>
                  <li class="clearfix"><div class="status_letter">B</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Комиссионер</label></li>
                  <li class="clearfix"><div class="status_letter">C</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Экспедитор</label></li>
                  <li class="clearfix"><div class="status_letter">D</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Лизингодатель</label></li>
                  <li class="clearfix"><div class="status_letter">E</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Участник договора о совместной деятельности</label></li>
                  <li class="clearfix"><div class="status_letter">F</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Экспортер или участник СРП</label></li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <b>7.</b><span class="field-name">Поставщик</span><span class="field-value"><%=invoice.sellers.seller[0].name%></span>
              </td>
            </tr>
            <tr>
              <td>
                  <b>8.</b><span class="field-name">Адрес места нахождения</span><span class="field-value"><%=invoice.sellers.seller[0].address%></span>
              </td>
            </tr>
            <tr>
              <td>
                <b>9.</b><span class="field-name">Свидетельство плательщика НДС:</span><br>
                <b>9.1.</b><span class="field-name">серия</span><span class="field-value"><%=invoice.sellers.seller[0].certificateSeries || ''%></span><br>
                <b>9.2.</b><span class="field-name">Номер</span><span class="field-value"><%=invoice.sellers.seller[0].certificateNum || ''%></span>
              </td>
            </tr>
            <tr>
              <td>
                <b>11.</b><span class="field-name">Документы, подтверждающие поставку товаров, работ, услуг:</span><br>
                <b>11.1.</b><span class="field-name">Номер</span><span class="field-value"><%=invoice.sellers.seller[0].deliveryDocNum || ''%></span><br>
                <b>11.2.</b><span class="field-name">Дата</span><span class="field-value"><%=invoice.sellers.seller[0].deliveryDocDate || ''%></span>
              </td>
              <td>
                <b>12.</b><span class="field-name">Дополнительные сведения</span><span class="field-value"><%=invoice.sellers.seller[0].trailer || ''%></span>
              </td>
            </tr>
            </tbody>
          </table>
          <table>
            <tbody>
            <tr>
              <td style="width:50%">
                <b>13.</b><span class="field-name">КБе</span><span class="field-value"><%=invoice.sellers.seller[0].kbe || ''%></span>
              </td>
              <td>
                <b>14.</b><span class="field-name">ИИК</span><span class="field-value"><%=invoice.sellers.seller[0].iik || ''%></span>
              </td>
            </tr>
            <tr>
              <td>
                <b>15.</b><span class="field-name">БИК</span><span class="field-value"><%=invoice.sellers.seller[0].bik || ''%></span>
              </td>
              <td>
                <b>16.</b><span class="field-name">Наименование банка</span><span class="field-value"><%=invoice.sellers.seller[0].bank || ''%></span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Section C -->
      <div class="sectionContainer">
        <h3>Раздел C. Реквизиты получателя</h3>
        <div>
          <table border="0">
            <tbody>
              <tr>
                <td style="width:55%">
                    <table class="no_border_table">
                    <tbody>
                      <tr>
                        <td class="first_td display_none">
                          <b>17.</b><span class="field-name">Страна</span><span class="field-value"></span>
                        </td>
                        <td class="first_td ">
                          <b>17.</b><span class="field-name">ИИН/БИН</span><span class="field-value"><%=invoice.customers.customer[0].tin || ''%></span>
                        </td>
                        <td>
                          <b>17.1</b><span class="field-name">РНН реорганизованного лица</span><span class="field-value"></span>
                        </td>
                      </tr>
                    </tbody>
                    </table>
                </td>
                <td rowspan="4">
                  <b>21.</b><span class="field-name">Категория получателя</span>
                  <ul class="select">
                    <li class="clearfix"><div class="status_letter">A</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Комитент</label></li>
                    <li class="clearfix"><div class="status_letter">B</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Комиссионер</label></li>
                    <li class="clearfix"><div class="status_letter">C</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Лизингополучатель</label></li>
                    <li class="clearfix"><div class="status_letter">D</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Участник договора о совместной деятельности</label></li>
                    <li class="clearfix"><div class="status_letter">E</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Государственное учреждение</label></li>
                    <li class="clearfix"><div class="status_letter">F</div><input class="status_input" onclick="return false" onkeydown="return false" type="checkbox"><label class="status_label">Нерезидент/розница</label></li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <b>18.</b><span class="field-name">Получатель</span><span class="field-value"><%=invoice.customers.customer[0].name || ''%></span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>19.</b><span class="field-name">Адрес места нахождения</span><span class="field-value"><%=invoice.customers.customer[0].address || ''%></span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>20.</b><span class="field-name">Дополнительные сведения</span><span class="field-value"><%=invoice.customers.customer[0].trailer || ''%></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Section D -->
      <div class="sectionContainer">
        <h3>Раздел D. Реквизиты грузоотправителя и грузополучателя</h3>
        <div>
          <table border="0">
            <tbody>
              <tr>
                <td>
                  <b>22.</b><span class="field-name">Грузоотправитель</span><br>
                  <b>22.1</b><span class="field-name">ИИН/БИН</span><span class="field-value"><%=invoice.consignor.tin || ''%></span><br>
                  <b>22.2</b><span class="field-name">Наименование</span><span class="field-value"><%=invoice.consignor.name || ''%></span><br>
                  <b>22.3</b><span class="field-name">Адрес отправки</span><span class="field-value"><%=invoice.consignor.address || ''%></span><br>
                </td>
                <td style="width:50%;">
                  <b>23.</b><span class="field-name">Грузополучатель</span><br>
                  <b>23.1</b><span class="field-name">ИИН/БИН</span><span class="field-value"><%=invoice.consignee.tin || ''%></span><br>
                  <b>23.2</b><span class="field-name">Наименование</span><span class="field-value"><%=invoice.consignee.name || ''%></span><br>
                  <b>23.3</b><span class="field-name">Адрес доставки</span><span class="field-value"><%=invoice.consignee.address || ''%></span><br>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Section E -->
      <div class="sectionContainer">
        <h3 class="section_customers">Раздел E. Условия поставки</h3>
        <div>
          <table border="0">
            <tbody>
              <tr>
                <td style="width:50%;">
                  <b>24</b><span class="field-name">Договор (контракт) на поставку товаров, работ, услуг</span><br>
                  <b>24.1</b><span class="field-name">Номер</span><span class="field-value"><%=invoice.deliveryTerm.contractNum || ''%></span><br>
                  <b>24.2</b><span class="field-name">Дата</span><span class="field-value"><%=invoice.deliveryTerm.contractDate || ''%></span>
                </td>
                <td>
                  <b>27</b><span class="field-name">Поставка товаров осуществлена по доверенности</span><br>
                  <b>27.1</b><span class="field-name">Номер</span><span class="field-value"><%=invoice.deliveryTerm.warrant || ''%></span><br>
                  <b>27.2</b><span class="field-name">Дата</span><span class="field-value"><%=invoice.deliveryTerm.warrantDate || ''%></span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>25.</b><span class="field-name">Условия оплаты по договору</span><span class="field-value"><%=invoice.deliveryTerm.term || ''%></span>
                </td>
                <td rowspan="2">
                  <b>28.</b><span class="field-name">Пункт назначения</span><span class="field-value"><%=invoice.deliveryTerm.destination || ''%></span>
                </td>
              </tr>
              <tr>
                <td>
                  <b>26.</b><span class="field-name">Способ отправления</span><span class="field-value"><%=invoice.deliveryTerm.exerciseWay || ''%></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Section G -->
      <div class="sectionContainer">
        <h3 class="section_product">Раздел G. Данные&nbsp;по&nbsp;товарам, работам,&nbsp;услугам</h3>
        <div>
          <table class="kursTable" border="0">
              <tbody><tr>
                  <td style="width:100px;">
                      <b>33.</b>
                  </td>
                  <td style="width:50%;">
                      <b>33.1</b><span class="field-name">Код валюты</span>
                      <span class="field-value">
                          KZT
                      </span>
                  </td>
                  <td>
                      <b>33.2</b><span class="field-name">Курс валюты</span><span class="field-value"></span>
                  </td>
              </tr>
          </tbody></table>
          <table class="ServiceTable" border="0">
              <thead>
                  <tr>
                      <th rowspan="2">№ п/п</th>
                      <th rowspan="2">Наименование товаров, работ, услуг</th>
                      <th rowspan="2">Код товара (ТН ВЭД)</th>
                      <th rowspan="2">Ед. изм.</th>
                      <th rowspan="2">Кол-во (объем)</th>
                      <th rowspan="2">Цена (тариф) за единицу товара, работы, услуги без косвенных налогов</th>
                      <th rowspan="2">Стоимость товаров, работ, услуг без косвенных налогов</th>
                      <th colspan="2">Акциз</th>
                      <th rowspan="2">Размер оборота по реализации (облагаемый/необлагаемый оборот)</th>
                      <th colspan="2">НДС</th>
                      <th rowspan="2">Стоимость товаров, работ, услуг с учетом косвенных налогов</th>
                      <th rowspan="2">№ заявления в рамках ТС или Декларации на товары</th>
                      <th rowspan="2">Дополнительные данные</th>
                  </tr>
                  <tr>
                      <th>Ставка</th>
                      <th>Сумма</th>
                      <th>Ставка</th>
                      <th>Сумма</th>
                  </tr>
              </thead>
              <tbody><tr>
                  <td class="num-cell">1</td>
                  <td class="num-cell">2</td>
                  <td class="num-cell">3</td>
                  <td class="num-cell">4</td>
                  <td class="num-cell">5</td>
                  <td class="num-cell">6</td>
                  <td class="num-cell">7</td>
                  <td class="num-cell">8</td>
                  <td class="num-cell">9</td>
                  <td class="num-cell">10</td>
                  <td class="num-cell">11</td>
                  <td class="num-cell">12</td>
                  <td class="num-cell">13</td>
                  <td class="num-cell">14</td>
                  <td class="num-cell">15</td>
              </tr>
              <% invoice.productSet.product.forEach(function(item, index) { %>
                <tr class="service_grid">
                  <td class="first" value="<%=index + 1%>"><%=index + 1%></td>
                  <td class="long" style="width: 200px;"><span><%=item.description || ''%></span></td>
                  <td class="long"><span><%=item.unitCode || ''%></span></td>
                  <td><span><%=item.unitNomenclature || ''%></span></td>
                  <td><span><%=item.quantity || ''%></span></td>
                  <td><span><%=item.unitPrice || ''%></span></td>
                  <td>
                    <span class="calculable" data-field="priceWithoutTax"><%=item.priceWithoutTax || ''%></span>
                  </td>
                  <td>
                    <span><%=item.exciseRate || ''%></span>
                  </td>
                  <td>
                    <span class="calculable" data-field="exciseAmount"><%=item.exciseAmount || ''%></span>
                  </td>
                  <td>
                    <span class="calculable" data-field="turnoverSize"><%=item.turnoverSize || ''%></span>
                  </td>
                  <td>
                    <span><%=item.ndsRate || ''%>%</span>
                  </td>
                  <td>
                    <span class="calculable" data-field="ndsAmount"><%=item.ndsAmount || ''%></span>
                  </td>
                  <td>
                    <span class="calculable" data-field="priceWithTax"><%=item.priceWithTax || ''%></span>
                  </td>
                  <td class="long"><span><%=item.applicationNumberInCustomsUnion || ''%></span></td>
                  <td class="long"><span><%=item.additional || ''%></span></td>
                </tr>
              <% }); %>
              <tr class="totalRow">
                <td></td>
                <td></td>
                <td colspan="4" style="text-align: right;">Всего по счету:</td>
                <!--<td></td>-->
                <!--<td></td>-->
                <!--<td></td>-->
                <td class="priceWithoutTax"><%=invoice.productSet.totalPriceWithoutTax || ''%></td>
                <td></td>
                <td class="exciseAmount"><%=invoice.productSet.totalExciseAmount || ''%></td>
                <td class="turnoverSize"><%=invoice.productSet.totalTurnoverSize || ''%></td>
                <td></td>
                <td class="ndsAmount"><%=invoice.productSet.totalNdsAmount || ''%></td>
                <td class="priceWithTax"><%=invoice.productSet.totalPriceWithTax || ''%></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Section J -->
      <div class="sectionContainer">
        <h3>Раздел J. Сведения по ЭЦП</h3>
        <div>
          <table border="0">
            <tbody>
              <tr>
                <td>
                  <table class="j-table" border="0">
                    <tbody>
                      <tr>
                        <td style="width:50%;"><b>36.</b><span class="field-name bold">ЭЦП юридического лица (структурного подразделения юридического лица) или индивидуального предпринимателя</span></td>
                        <td style="width:30%;"><p></p></td>
                        <td style="width:20%; text-align: center" rowspan="2">М.П.</td>
                      </tr>
                      <tr>
                        <td><b>37.</b><span class="field-name bold">ЭЦП лица, уполномоченного подписывать счета-фактуры</span></td>
                        <td><p><%=invoice.signature || ''%></p></td>
                      </tr>
                      <tr>
                        <td><b>38.</b><span class="field-name bold">Ф.И.О. лица, уполномоченного подписывать счета-фактуры</span></td>
                        <td><p><%=invoice.operatorFullname || ''%></p></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
  </html>
`;

const options = { rmWhitespace: true };
const jsonToHtml = json => ejs.render(template, JSON.parse(json), options);

module.exports = jsonToHtml;
