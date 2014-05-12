require 'json'
require 'open-uri'
require 'net/http'

class Bing
  
  ACCOUNT_KEY = "YOUR_ACCOUNT_KEY_SHOULD_BE_IN_VARIABLE_ELSEWHERE"
  SEARCH_TYPE = "Image"
  NUMBER_OF_RESULTS = 36
  
  attr_accessor :account_key, :num_results, :type, :params, :image_results

	def initialize(params = {})
		@account_key = ACCOUNT_KEY
		@num_results = NUMBER_OF_RESULTS
		@type = SEARCH_TYPE
		@params = params
    @image_results = []
	end

	def search(search_term, offset = 0)
		user = ''
		web_search_url = "https://api.datamarket.azure.com/Bing/Search/v1/Composite?Sources="
		sources_portion = URI.encode_www_form_component('\'' + @type + '\'')
		query_string = '&$format=json&Query='
		query_portion = URI.encode_www_form_component('\'' + search_term + '\'')
		params = "&$top=#{@num_results}&$skip=#{offset}"
		@params.each do |k,v|
			params << "&#{k.to_s}=\'#{v.to_s}\'"
		end

		full_address = web_search_url + sources_portion + query_string + query_portion + params

		uri = URI(full_address)
		req = Net::HTTP::Get.new(uri.request_uri)
		req.basic_auth user, account_key

		res = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => uri.scheme == 'https'){|http|
			http.request(req)
		}

		body = JSON.parse(res.body, :symbolize_names => true)
		result_set = body[:d][:results]
	end
  
  def get_bing_images(search_term)
    @search = search(search_term)
    parse_image_results(@search)
  end
  
def parse_image_results(bing_results_array)
  @image_results = []
  bing_images = bing_results_array[0][:Image]
  bing_images.each do |bing_image|
    @image_results << {url: bing_image[:MediaUrl], thumbnail: bing_image[:Thumbnail][:MediaUrl]}
  end
  @image_results
end
  
end