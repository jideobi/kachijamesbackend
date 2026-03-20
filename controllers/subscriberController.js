import pool from "../config/db.js";
import { sendEmail } from "../services/emailServices.js"; 

// Subscribe user
export const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Valid email required" });
  }

  try {
    // Save email in database
    await pool.query(
      "INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT DO NOTHING",
      [email]
    );

    // Send welcome email
    await sendEmail(
      email,
      "Welcome 🎉",
      `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en-US">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]--><!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css2?family=Orbit&amp;display=swap" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&amp;display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		.row-2 .column-3 .block-1 .button:hover,
		.row-6 .column-2 .block-3 .button:hover {
			border-bottom: 1px solid #0e1318 !important;
			border-left: 1px solid #0e1318 !important;
			border-right: 1px solid #0e1318 !important;
			border-top: 1px solid #0e1318 !important;
		}

		.row-2 .column-3 .block-1 .button:hover {
			background-color: #0e1318 !important;
			color: #f4f4f6 !important;
		}

		.row-6 .column-2 .block-3 .button:hover {
			background-color: #c5ff68 !important;
			color: #0e1318 !important;
		}

		@media (max-width:720px) {

			.desktop_hide table.icons-inner,
			.row-2 .column-3 .block-1.button_block .alignment .button,
			.row-6 .column-2 .block-3.button_block .alignment .button,
			.row-9 .column-2 .block-2.social_block .alignment table,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block div.fullWidth {
				max-width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.row-2 .column-1 .block-1.image_block .alignment div,
			.row-5 .column-1 .block-5.image_block .alignment div {
				margin: 0 auto !important;
			}

			.row-3 .column-1 .block-1.spacer_block,
			.row-4 .column-1 .block-1.spacer_block {
				height: 83px !important;
			}

			.row-2 .column-3 .block-1.button_block td.pad,
			.row-5 .column-1 .block-2.heading_block td.pad,
			.row-5 .column-1 .block-3.heading_block td.pad,
			.row-6 .column-2 .block-3.button_block td.pad {
				padding: 10px 20px !important;
			}

			.row-2 .column-3 .block-1.button_block span,
			.row-6 .column-2 .block-3.button_block span {
				line-height: 32px !important;
			}

			.row-2 .column-3 .block-1.button_block .alignment,
			.row-6 .column-2 .block-3.button_block .alignment {
				text-align: center !important;
			}

			.row-5 .column-1 .block-1.spacer_block {
				height: 10px !important;
			}

			.row-5 .column-1 .block-3.heading_block h1 {
				text-align: left !important;
				font-size: 44px !important;
			}

			.row-9 .column-2 .block-2.social_block .alignment,
			.row-9 .column-2 .block-3.heading_block h3,
			.row-9 .column-2 .block-4.heading_block h3 {
				text-align: left !important;
			}

			.row-5 .column-1 .block-2.heading_block h2 {
				text-align: left !important;
				font-size: 12px !important;
			}

			.row-1 .column-1 .block-1.image_block td.pad {
				padding: 15px 0 0 !important;
			}

			.row-1 .column-1 .block-1.image_block .alignment div,
			.row-9 .column-1 .block-2.image_block .alignment div {
				margin: 0 auto 0 0 !important;
			}

			.row-5 .column-1 .block-4.spacer_block,
			.row-5 .column-1 .block-6.spacer_block {
				height: 20px !important;
			}

			.row-5 .column-1,
			.row-5 .column-1 .block-5.image_block td.pad,
			.row-7 .column-1 .col-pad {
				padding: 0 !important;
			}

			.row-9 .column-1 .block-1.spacer_block {
				height: 40px !important;
			}

			.row-9 .column-2 .block-2.social_block td.pad {
				padding: 10px 0 0 !important;
			}

			.row-9 .column-1 .block-3.paragraph_block td.pad {
				padding: 10px 0 !important;
			}

			.row-9 .column-2 .block-3.heading_block td.pad,
			.row-9 .column-2 .block-4.heading_block td.pad {
				padding: 10px 0 5px !important;
			}

			.row-9 .column-2 .block-5.spacer_block {
				height: 60px !important;
			}

			.row-1 .row-content {
				padding: 10px 20px 0 !important;
			}

			.row-9 .row-content {
				padding-left: 20px !important;
				padding-right: 20px !important;
			}

			.row-1 .column-1 .col-pad,
			.row-2 .column-1 .col-pad {
				padding: 5px 0 0 !important;
			}

			.row-9 .column-1 .col-pad,
			.row-9 .column-2 .col-pad {
				padding: 5px 0 !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="background-color: #0e1318; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0e1318; background-repeat: no-repeat; background-size: auto; background-image: none; background-position: top left;">
		<tbody>
			<tr>
				<td><!--[if !mso]><!-->
					<table class="row row-1 desktop_hide" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-hide: all; display: none; max-height: 0; overflow: hidden;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-hide: all; display: none; max-height: 0; overflow: hidden; background-color: #f4f4f6; border-radius: 0; color: #000000; padding-left: 60px; padding-right: 60px; padding-top: 10px; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td>
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-hide: all; display: none; max-height: 0; overflow: hidden;">
														<tbody>
															<tr>
																<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
																	<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-hide: all; display: none; max-height: 0; overflow: hidden;">
																		<tr>
																			<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																				<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-hide: all; display: none; max-height: 0; overflow: hidden;">
																					<tr>
																						<td class="pad" style="padding-bottom:15px;padding-top:15px;width:100%;padding-right:0px;padding-left:0px;">
																							<div class="alignment" align="left">
																								<div style="max-width: 116px;"><a href="https://www.example.com" target="_blank"><img src="https://9228452c8c.imgdist.com/pub/bfra/35i2s8bv/kjf/c0w/lb9/Logo.png" style="display: block; height: auto; border: 0; width: 100%;" width="116" alt="Your logo" title="Your logo" height="auto"></a></div>
																							</div>
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table><!--<![endif]-->
					<table class="row row-2 mobile_hide" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f4f6; border-radius: 0; color: #000000; padding-left: 60px; padding-right: 60px; padding-top: 10px; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td>
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tbody>
															<tr>
																<td class="column column-1" width="25%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
																	<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																				<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td class="pad" style="padding-bottom:15px;padding-top:15px;width:100%;">
																							<div class="alignment" align="left">
																								<div style="max-width: 145px;"><a href="https://www.example.com" target="_blank"><img src="https://9228452c8c.imgdist.com/pub/bfra/35i2s8bv/kjf/c0w/lb9/Logo.png" style="display: block; height: auto; border: 0; width: 100%;" width="145" alt="Your logo" title="Your logo" height="auto"></a></div>
																							</div>
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
																<td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
																	<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																				<div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
																			</td>
																		</tr>
																	</table>
																</td>
																<td class="column column-3" width="41.666666666666664%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
																	<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																				<table class="button_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																					<tr>
																						<td class="pad" style="padding-bottom:10px;padding-top:10px;text-align:right;">
																							<div class="alignment" align="right"><a href="https://www.kachijames.com/" target="_blank" style="color:#0e1318;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.kachijames.com/"  style="height:52px;width:210px;v-text-anchor:middle;" arcsize="10%" fillcolor="#c5ff68">
<v:stroke dashstyle="Solid" weight="1px" color="#0e1318"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#0e1318;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #c5ff68; border-bottom: 1px solid #0e1318; border-left: 1px solid #0e1318; border-radius: 5px; border-right: 1px solid #0e1318; border-top: 1px solid #0e1318; color: #0e1318; display: inline-block; font-family: 'Orbit','Helvetica'; font-size: 16px; font-weight: 400; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span class="btn-pad" style="word-break: break-word; padding-left: 30px; padding-right: 30px; padding-top: 10px; padding-bottom: 10px; display: block;"><span style="word-break: break-word; line-height: 32px;">Discover More →</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
																						</td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-3 mobile_hide" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: auto; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10606/04_Upper_Grid_04.png'); border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<div class="spacer_block block-1" style="height:128px;line-height:128px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table><!--[if !mso]><!-->
					<table class="row row-4 desktop_hide" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-hide: all; display: none; max-height: 0; overflow: hidden; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-hide: all; display: none; max-height: 0; overflow: hidden; background-repeat: no-repeat; background-size: auto; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10606/Hero_Art_Mobile_30_percent_opacity.png'); border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;">
													<div class="spacer_block block-1" style="height:128px;line-height:128px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table><!--<![endif]-->
					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5ff68; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
													<table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h2 style="margin: 0; color: #0e1318; direction: ltr; font-family: 'Orbit','Helvetica'; font-size: 16px; font-weight: 400; letter-spacing: 1px; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 19px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Welcome 🎉<br>You're now part of our community</span></h2>
															</td>
														</tr>
													</table>
													<table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;text-align:center;width:100%;">
																<h1 style="margin: 0; color: #0e1318; direction: ltr; font-family: 'Instrument Sans','Helvetica'; font-size: 54px; font-weight: 400; letter-spacing: -2px; line-height: 1; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 54px;"><span class="tinyMce-placeholder" style="word-break: break-word;">&nbsp;Thank you for subscribing to our newsletter! We're excited to have you with us.</span></h1>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-4" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
													<table class="image_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-left:60px;padding-right:60px;width:100%;">
																<div class="alignment" align="center">
																	<div class="fullWidth" style="max-width: 580px;"><img src="https://9228452c8c.imgdist.com/pub/bfra/35i2s8bv/bog/up7/n59/Kachi-James-Arts-Gallery-opening-in-Enugu.webp" style="display: block; height: auto; border: 0; width: 100%;" width="580" alt="a woman sitting at a desk using a laptop" title="a woman sitting at a desk using a laptop" height="auto"></div>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-6" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-6 mobile_hide" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5ff68; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="8.333333333333334%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="83.33333333333333%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
																			<div style="color:#2c3239;direction:ltr;font-family:'Instrument Sans','Helvetica';font-size:18px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:22px;">
																				<p style="margin: 0;">Thanks for signing up. Please confirm your subscription so we can start sending you updates, insights, and resources designed to help you grow.</p>
																			</div>
																		</td>
																	</tr>
																</table>
																<div class="spacer_block block-2" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
																<table class="button_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-left:60px;padding-right:60px;text-align:center;">
																			<div class="alignment" align="center"><a href="https://www.example.com" target="_blank" style="color:#f4f4f6;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:52px;width:297px;v-text-anchor:middle;" arcsize="10%" fillcolor="#0e1318">
<v:stroke dashstyle="Solid" weight="1px" color="#f4f4f6"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#f4f4f6;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #0e1318; border-bottom: 1px solid #f4f4f6; border-left: 1px solid #f4f4f6; border-radius: 5px; border-right: 1px solid #f4f4f6; border-top: 1px solid #f4f4f6; color: #f4f4f6; display: inline-block; font-family: 'Orbit','Helvetica'; font-size: 16px; font-weight: 400; mso-border-alt: none; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span class="btn-pad" style="word-break: break-word; padding-left: 30px; padding-right: 30px; padding-top: 10px; padding-bottom: 10px; display: block;"><span style="word-break: break-word; line-height: 32px;">Confirm My Subscription →</span></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-3" width="8.333333333333334%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad">
																			<div></div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5ff68; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad">
																			<div></div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-8" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: auto; background-color: #c5ff68; border-radius: 0; color: #000000; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10606/05_Base_Grid_04.png'); width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table class="image_block block-1 mobile_hide" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center">
																	<div class="fullWidth" style="max-width: 700px;"><img src="https://9228452c8c.imgdist.com/pub/bfra/35i2s8bv/kjf/c0w/lb9/Logo.png" style="display: block; height: auto; border: 0; width: 100%;" width="700" alt="a white text on a black background" title="a white text on a black background" height="auto"></div>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-9" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #c5ff68; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-radius: 0px 0px 0px 0px;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-left:60px;">
																<div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
																<table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-bottom:10px;padding-top:10px;width:100%;padding-right:0px;padding-left:0px;">
																			<div class="alignment" align="left">
																				<div style="max-width: 101.667px;"><a href="https://www.example.com" target="_blank"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/10606/New_Autoflow_Logo_02.png" style="display: block; height: auto; border: 0; width: 100%; border-radius: 0px 0px 0px 0px;" width="101.667" alt="Your logo" title="Your logo" height="auto"></a></div>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
																	<tr>
																		<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																			<div style="color:#0e1318;direction:ltr;font-family:'Instrument Sans','Helvetica';font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:21px;">
																				<p style="margin: 0;">© All Rights Reserved.<br>Olive Gate Hotel Junction, 1 Snapp Drive,<br>Independence Layout, Enugu 410001, Enugu State, Nigeria<br><a rel="noopener" style="text-decoration: underline; color: #0e1318;"></a></p>
																			</div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-radius: 0px 0px 0px 0px;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-left:30px;">
																<div class="spacer_block block-1 mobile_hide" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
																<table class="social_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-bottom:5px;padding-top:10px;text-align:left;padding-right:0px;padding-left:0px;">
																			<div class="alignment" align="left">
																				<table class="social-table" width="143px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
																					<tr>
																						<td style="padding:0 0 0 0px;"><a href="https://www.facebook.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-default-black/facebook@2x.png" width="32" height="auto" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
																						<td style="padding:0 0 0 5px;"><a href="https://x.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-default-black/twitter@2x.png" width="32" height="auto" alt="Twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
																						<td style="padding:0 0 0 5px;"><a href="https://www.linkedin.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-default-black/linkedin@2x.png" width="32" height="auto" alt="Linkedin" title="linkedin" style="display: block; height: auto; border: 0;"></a></td>
																						<td style="padding:0 0 0 5px;"><a href="https://www.instagram.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-default-black/instagram@2x.png" width="32" height="auto" alt="Instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
																					</tr>
																				</table>
																			</div>
																		</td>
																	</tr>
																</table>
																<table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-bottom:5px;padding-right:30px;padding-top:10px;text-align:center;width:100%;">
																			<h3 style="margin: 0; color: #0e1318; direction: ltr; font-family: 'Instrument Sans','Helvetica'; font-size: 14px; font-weight: 400; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 17px;"><span class="tinyMce-placeholder" style="word-break: break-word;"><a href="http://www.example.com/unsubscribe" target="_blank" style="text-decoration: underline; color: #0e1318;" rel="noopener"><span class="mce-content-body mce-edit-focus" style="word-break: break-word; position: relative;" id="9fd27d51-d9e2-46ec-b813-f8c4e71df27d" data-position="150-1-1" data-qa="tinyeditor-root-element"><span class="tinyMce-placeholder" style="word-break: break-word;">Unsubscribe</span></span></a></span></h3>
																		</td>
																	</tr>
																</table>
																<table class="heading_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="pad" style="padding-bottom:5px;padding-right:30px;padding-top:10px;text-align:center;width:100%;">
																			<h3 style="margin: 0; color: #0e1318; direction: ltr; font-family: 'Instrument Sans','Helvetica'; font-size: 14px; font-weight: 400; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 17px;"><span class="tinyMce-placeholder" style="word-break: break-word;"><a href="http://www.example.com/unsubscribe" target="_blank" style="text-decoration: underline; color: #0e1318;" rel="noopener"><span class="mce-content-body mce-edit-focus" style="word-break: break-word; position: relative;" id="9fd27d51-d9e2-46ec-b813-f8c4e71df27d" data-position="150-1-1" data-qa="tinyeditor-root-element"><span class="tinyMce-placeholder" style="word-break: break-word;"></span></span></a><a href="https://www.example.com/" target="_blank" rel="noopener" style="text-decoration: underline; color: #0e1318;">Privacy Policy</a></span></h3>
																		</td>
																	</tr>
																</table>
																<div class="spacer_block block-5" style="height:70px;line-height:70px;font-size:1px;">&#8202;</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-10" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px; margin: 0 auto;" width="700">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;">
													<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="col-pad" style="padding-bottom:5px;padding-top:5px;">
																<table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;">
																	<tr>
																		<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" ><![endif]-->
																			<!--[if !vml]><!-->
																			<table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
																				<tr>
																					<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="https://designedwithbeefree.com/" target="_blank" title="Designed with Beefree" style="text-decoration: none;"><img class="icon" alt="Beefree Logo" src="https://d1oco4z2z1fhwp.cloudfront.net/assets/Beefree-logo.png" height="auto" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
																					<td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: normal; text-align: center; line-height: normal;"><a href="https://designedwithbeefree.com/" target="_blank" title="Designed with Beefree" style="color: #1e0e4b; text-decoration: none;">Designed with Beefree</a></td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>`
    );

    res.json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------
// Get all subscribers
// ----------------------------
export const getAllSubscribers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM subscribers ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};