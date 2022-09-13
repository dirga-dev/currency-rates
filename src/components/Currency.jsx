import { useState, useEffect } from "react";
import axios from "axios";

const API =
	"https://api.currencyfreaks.com/latest?apikey=d2915dfa545146bab2ad97bc9d16e075&symbols=CAD,IDR,JPY,CHF,EUR,GBP";

const Currency = () => {
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const response = await axios.get(API);
			setData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<div className="max-w-xl mx-auto mt-16">
				<h1 className="font-bold mx-auto text-center text-3xl mb-10">
					Currency Rates
				</h1>
				<div className="flex flex-col">
					<div className="overflow-x-auto">
						<div className="p-1.5 w-full inline-block align-middle">
							<div className="overflow-hidden border rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr className="text-md text-center font-bold text-gray-500 uppercase h-16 px-6">
											<th>Currency</th>
											<th>We buy</th>
											<th>Exchange Rates</th>
											<th>We Sell</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{data.rates &&
											Object.keys(data.rates).map((currency, dataCurrency) => (
												<tr
													className="table-light text-center h-10 py-8"
													key={dataCurrency}
												>
													<td>{currency}</td>
													<td>
														{(
															parseFloat(data.rates[currency]) +
															data.rates[currency] * 0.05
														).toFixed(4)}
													</td>
													<td>{parseFloat(data.rates[currency]).toFixed(4)}</td>
													<td>
														{(
															parseFloat(data.rates[currency]) -
															data.rates[currency] * 0.05
														).toFixed(4)}
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className="my-10 font-bold text-center text-sm text-gray-600">
						<h2 className="mt-10text-md">Rates are based from 1 USD</h2>
						<h2 className="text-md">
							This application uses API from{" "}
							<a href="https://currencyfreaks.com/">
								https://currencyfreaks.com/
							</a>
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Currency;
