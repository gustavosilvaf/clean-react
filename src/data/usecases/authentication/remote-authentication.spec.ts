interface HttpPostClient {
    post(url: string): Promise<void>
}

class RemoteAuthentication {
  constructor (
      private readonly url: string,
      private readonly httpClient: HttpPostClient
  ) {
    console.log(url, httpClient)
  }

  async auth (): Promise<void> {
    await this.httpClient.post(this.url)
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
        url?: string
        async post (url: string): Promise<void> {
          this.url = url
          return Promise.resolve()
        }
    }
    const url = 'any_url'
    const httpClientSpy = new HttpPostClientSpy()

    const sut = new RemoteAuthentication(url, httpClientSpy)
    await sut.auth()
    expect(httpClientSpy.url).toBe(url)
  })
})
