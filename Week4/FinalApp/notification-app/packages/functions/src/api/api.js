const API_VERSION = '2024-01';
/**
 *
 * @param {string} url
 * @param {string} method
 * @param {object} body
 * @param {object} headers
 * @returns {Promise<any>}
 */
const makeGraphQlRequest = async (url, {method, body, headers}) => {
  const response = await fetch(url, {
    method,
    body,
    headers
  });
  return response.json();
};

/**
 *
 * @param shopifyDomain
 * @param accessToken
 * @returns {Promise<*[]>}
 */
export const handleGetOrderApi = async ({shopifyDomain, accessToken}) => {
  try {
    const result = await makeGraphQlRequest(
      `https://${shopifyDomain}/admin/api/${API_VERSION}/graphql.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          query: `
              query {
                orders(first: 30) {
                  edges {
                    node {
                      createdAt
                      lineItems(first: 1) {
                        edges {
                          node {
                            image {
                              src
                            }
                            name
                            product {
                              id
                            }
                          }
                        }
                      }
                      shippingAddress {
                        city
                        firstName
                        country
                      }
                    }
                  }
                }
            }
            `
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        }
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 *
 * @param shopifyDomain
 * @param accessToken
 * @returns {Promise<*[]>}
 */
export const handleGetProductApi = async ({shopifyDomain, accessToken, productId}) => {
  try {
    const result = await makeGraphQlRequest(
      `https://${shopifyDomain}/admin/api/${API_VERSION}/graphql.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          query: `
                query {
                  product(id: "gid://shopify/Product/${productId}") {
                      id
                      title
                      images(first: 1) {
                      nodes {
                            src
                          }
                        }
                      }
                  }
              `
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        }
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
