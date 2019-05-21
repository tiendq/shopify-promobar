import React from 'react';
import { Page, Card } from '@shopify/polaris';

let iconUrl = `${window.location.protocol}//${window.location.host}/static/images/icons/app-20x20.png`;

let secondaryActions = [{
  content: 'Promo',
  url: '/promo/edit',
  target: 'app'
}];

function SupportPage() {
  return (
    <Page title="Support" icon={iconUrl} secondaryActions={secondaryActions} fullWidth>
      <Card title="FAQ" sectioned>
        <div className="support-page">
          <p className="faq-heading">Got a question about using Promo Bar?</p>
          <p className="faq-question">Q: What is a promo bar?</p>
          <p>It&apos;s a narrow bar that displayed on top or bottom of your store to make easier for customers to see your offers.</p>
          <p className="faq-question">Q: Do I need to change anything in current theme?</p>
          <p>There&apos;s no need to edit any theme files.</p>
          <p className="faq-question">Q: Where is the promo bar installed in my store?</p>
          <p>Promo Bar is dynamically loaded into the pages of your store. When you uninstall the app, all app scripts are automatically removed too.</p>
          <p className="faq-question">Q: What if I change my theme?</p>
          <p>You can do it anytime since this app doesn&apos;t touch your theme files.</p>
          <p className="faq-question">Q: Can I use simple text formatting with promo message?</p>
          <p>No, at this moment. But we&apos;re actively working on more customizable features.</p>
          <p className="faq-question">Q: Can I choose to only display the promo bar on some pages?</p>
          <p>No, the promo bar is currently displayed on all storefront pages and in the order status page of checkout.</p>
        </div>
      </Card>
      <Card title="Contact Us" sectioned>
        <p>Still not finding what you need?</p>
        <p>Our support team is here to help, please send us an email to <strong>support@example.com</strong></p>
      </Card>
    </Page>
  );
}

export default SupportPage;
