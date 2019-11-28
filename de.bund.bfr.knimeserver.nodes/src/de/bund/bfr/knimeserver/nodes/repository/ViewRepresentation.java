package de.bund.bfr.knimeserver.nodes.repository;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.List;
import java.util.Objects;

import org.knime.core.node.InvalidSettingsException;
import org.knime.core.node.NodeSettingsRO;
import org.knime.core.node.NodeSettingsWO;
import org.knime.js.core.JSONViewContent;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class ViewRepresentation extends JSONViewContent {

	List<Link> links;

	@Override
	public void saveToNodeSettings(NodeSettingsWO settings) {
	}

	@Override
	public void loadFromNodeSettings(NodeSettingsRO settings) throws InvalidSettingsException {
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}

		final ViewRepresentation other = (ViewRepresentation) obj;
		return links.equals(other.links);
	}

	@Override
	public int hashCode() {
		return Objects.hash(links);
	}

	@JsonAutoDetect
	public static class Link {

		enum LinkType {
			edition, publication
		};

		public final String text;
		public final String url;
		public final LinkType type;
		
		public Link(final String text, final String url, final LinkType type) {
			this.text = text;
			this.url = url;
			this.type = type;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj) {
				return true;
			}
			if (obj == null) {
				return false;
			}
			if (getClass() != obj.getClass()) {
				return false;
			}

			final Link other = (Link) obj;
			return text.equals(other.text) && url.equals(other.url) && type == other.type;
		}

		@Override
		public int hashCode() {
			return Objects.hash(text, url, type);
		}
	}
}
